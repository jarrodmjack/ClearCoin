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
    userId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Transaction', TransactionSchema)
