const {Request, Response} = require('express')
const {Account, Customer, Employee} = require('../schemas')
const {hash, compare} = require('bcrypt')
const security = require('../configs/security.json')
const {generateToken, generateRandomNumber} = require('../helpers')

/**
 * Auth
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
const auth = async (req, res, next) => {

    const CUSTOMER_ROLE = 'Customer'
    const EMPLOYEE_ROLE = 'Employee'

    const {hasAccount, account} = await Account.findOne({email: req.body.email})
        .then((result) => {
            return {hasAccount: result != null, account: result}
        })
        .catch(() => {
            return {hasAccount: false, account: null}
        })

    if (hasAccount) {
        const signInSuccessfully = 'SignIn Successfully!'

        const isValid = await compare(req.body.password, account.password).catch((e) => {
            return e !== null
        })

        if (!isValid) {
            const error = new Error('Wrong password')
            error.status = 401

            return next(error)
        }

        if (account.role === CUSTOMER_ROLE) {
            const customer = await Customer.findOne({_id: account.customer_account})
                .then((res) => {
                    return {
                        customer_id: res._id,
                        reader_card_num: res.reader_card_num
                    }
                })

            const token = await generateToken({
                email: account.email,
                role: account.role,
                reader_card_num: customer.reader_card_num,
                customer_id: customer.customer_id
            })

            return res.json({
                message: signInSuccessfully,
                method: 'sign_in',
                token: token
            })
        }

        if (account.role === EMPLOYEE_ROLE) {
            const employeeNo = await Employee.findOne({_id: account.employee_account})
                .then((res) => res.employee_no);

            const token = await generateToken({
                email: account.email,
                role: account.role,
                employee_no: employeeNo
            })

            return res.json({
                message: signInSuccessfully,
                method: 'sign_in',
                token: token
            })
        }

        const error = new Error('System Inconsistency!')
        error.status = 400

        return next(error)
    }

    try {
        const signUpSuccessfully = 'SignUp Successfully!'

        const encrypted = await hash(req.body.password, security.saltRounds)

        if (req.body.role === CUSTOMER_ROLE) {
            const customer = await Customer.create({
                reader_card_num: generateRandomNumber(900000, 999999),
                name: req.body.name
            })

            const account = await Account.create({
                email: req.body.email,
                password: encrypted,
                role: CUSTOMER_ROLE,
                customer_account: customer._id
            })

            return res.json({
                message: signUpSuccessfully,
                method: 'sign_up',
                account: account,
            })
        }

        if (req.body.role === EMPLOYEE_ROLE) {
            const employee = await Employee.create({
                employee_no: generateRandomNumber(300000, 333333),
                name: req.body.name
            })

            const account = await Account.create({
                email: req.body.email,
                password: encrypted,
                role: EMPLOYEE_ROLE,
                employee_account: employee
            })

            return res.json({
                message: 'Signup successful',
                method: 'sign_up',
                account: account,
            })
        }

        const error = new Error('Unrecognized role')
        error.status = 400

        return next(error)
    } catch (e) {
        const error = new Error(e.message)
        error.status = 400

        return next(error)
    }
}

const getAccountInfo = async (req, res, next) => {
    try {
        const account = await Account.findOne({email: req.params.email})

        return res.json({email: account.email, role: account.role})
    } catch (e) {
        const error = new Error(e.message)
        error.status = 400

        return next(error)
    }
}

module.exports = {
    auth, getAccountInfo,
}
