const express = require('express');
const router = express.Router();
const {
    getTransactions,
    setTransaction,
    updateTransaction,
    deleteTransaction,
} = require('../controllers/transactionController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getTransactions).post(protect, setTransaction);
router.route('/:id').put(protect, updateTransaction).delete(protect, deleteTransaction);

module.exports = router;