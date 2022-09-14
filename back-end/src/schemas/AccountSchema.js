const {Schema, model} = require('mongoose')

const accountSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Employee', 'Customer'],
        required: true,
    },
    customer_account: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: false
    },
    employee_account: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: false
    }
})

module.exports = model('Account', accountSchema)
