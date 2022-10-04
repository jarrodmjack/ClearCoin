const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    symb: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
})

module.exports = mongoose.model('Transaction', TransactionSchema)
