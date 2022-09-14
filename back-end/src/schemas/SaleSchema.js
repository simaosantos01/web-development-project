const mongoose = require('mongoose')
const {Condition} = require("./enums");
const {State} = require("./enums");
const Schema = mongoose.Schema

const saleSchema = new Schema({
    reader_card_num: {
        type: Number,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
    },
    condition: {
        type: String,
        enum: Condition,
        default: 'used',
        required: true,
    },
    state: {
        type: String,
        enum: State,
        default: 'in_store',
        required: false,
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true,
    },
    updated_at: {
        type: Date,
        default: Date.now,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    }
})

module.exports = mongoose.model('Sale', saleSchema)
