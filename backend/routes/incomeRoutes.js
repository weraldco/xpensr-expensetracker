const express = require('express');

const {
	addIncome,
	getAllIncome,
	downloadIncomeExcel,
	deleteIncome,
} = require('../controllers/incomeController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', protect, addIncome);
router.post('/get', protect, getAllIncome);
router.post('/downloadexcel', protect, downloadIncomeExcel);
router.post('/delete', protect, deleteIncome);

module.exports = router;
