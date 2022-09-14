const {Request, Response, NextFunction} = require('express')
const {Sale, Customer, Book} = require('../schemas')
const {getBook} = require("./BooksHandler");

/**
 * Create a Sale
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const createSale = async (req, res, next) => {
    try {

        let customer = await Customer.findOne({reader_card_num: req.body.reader_card_num})
        let book = await Book.findOne({isbn: req.body.isbn})

        if (customer == null) {
            throw Error('Customer does not exists.')
        }

        if (book == null) {
            throw Error('Book does not exists.')
        }

        const sale = await Sale.create(req.body)

        await Book.findOneAndUpdate(
            {isbn: req.body.isbn},
            {$inc: {stock_used: 1}},
            {returnOriginal: false}
        )

        return res.status(200).json({
            message: 'Sale successfully added',
            Sale: sale,
        })
    } catch (e) {
        const error = new Error(e.message)
        error.status = 400

        return next(error)
    }
}

/**
 * Get all Sales of Customer
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getSales = async (req, res, next) => {
    try {
        const sales = await Sale.find({reader_card_num: req.params.reader_card_num})

        const output = sales.map((sale) => {
            return {
                reader_card_num: sale.reader_card_num,
                isbn: sale.isbn,
                state: sale.state,
                condition: sale.condition,
            }
        })

        return res.status(200).json({
            sales: output
        })
    } catch (e) {
        return next(e)
    }
}

/**
 * Get the Number of Sales by a metric of a Customer
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getMetric = async (req, res, next) => {
    try {

        let value = await Sale.find({reader_card_num: req.params.reader_card_num, state: req.params.state}).count()

        return res.status(200).json({
            value: value
        })
    } catch (e) {
        return next(e)
    }
}

const getMetrics = async (req, res, next) => {
    try {

        let in_store = await Sale.find({reader_card_num: req.params.reader_card_num, state: 'in_store'}).count()
        let sold = await Sale.find({reader_card_num: req.params.reader_card_num, state: 'sold'}).count()

        const sales = await Sale.find({reader_card_num: req.params.reader_card_num, state: 'sold'})

        let profit = 0

        for (const sale of sales) {
            let book = await Book.findOne({isbn: sale.isbn})
            profit += book.price_used
        }

        return res.status(200).json(
            [
                {metric: 'Nº of books in store', value: in_store},
                {metric: 'Nº of books sold', value: sold},
                {metric: 'Amount made', value: profit},

            ]
        )
    } catch (e) {
        return next(e)
    }
}

const sellBook = async (req, res, next) => {
    try {
        let book = await Book.findOne({isbn: req.body.isbn})

        if (book.stock_used <= 0) {
            throw Error('This book does not have used stock.')
        }

        let previous = null
        let sales = await Sale.find({isbn: req.body.isbn, state: 'in_store'})

        for (const sale of sales) {
            if (previous === null || sale.created_at < previous.created_at) {
                previous = sale
            }
        }

        if (previous === null) {
            throw Error('This sale does exist.')
        }

        previous.state = 'sold'
        book.stock_used = book.stock_used - 1

        return res.status(200).json({
            message: 'Book sold',
            sale: previous
        })

    } catch (e) {
        return next(e)
    }

}

module.exports = {
    createSale,
    getSales,
    getMetric,
    getMetrics,
    sellBook
}