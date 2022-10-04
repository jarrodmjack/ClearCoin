const asyncHandler = require('express-async-handler');
const { request } = require('http');

const Transaction = require('../models/transactionModel');

//  @desc   Get Goals
//  @route  GET /api/goals
//  @access Private
const getTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({ user: req.user.id });

    res.status(200).json(transactions);
});

//  @desc   Set Goal
//  @route  POST /api/goals
//  @access Private
const setTransaction = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field');
    }

    const transaction = await Transaction.create({
        text: req.body.text,
        user: req.user.id,
    });

    res.status(200).json(transaction);
});

//  @desc   Update Goal
//  @route  PUT /api/goals/:id
//  @access Private
const updateTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
        res.status(400);
        throw new Error('transaction not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user match the owner
    if (transaction.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedTransaction);
});

//  @desc   Delete Goals
//  @route  DELETE /api/goals/:id
//  @access Private
const deleteTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
        res.status(400);
        throw new Error('transaction not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user match the owner
    if (transaction.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await Transaction.remove();

    res.status(200).json({ id: req.params.id });
});

module.exports = { getTransactions, setTransaction, updateTransaction, deleteTransaction };