const User = require('../models/User');
const xlsx = require('xlsx');
const Expense = require('../models/Expense');
const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../middleware/errorMiddleware');

// Add Expense
exports.addExpense = async (req, res, next) => {
	const userId = req.user.id;
	try {
		const { icon, category, amount, date } = req.body;
		if (typeof category !== 'string' || !category.trim()) {
			throw new ApiError(400, 'Category is required.');
		}

		const parsedAmount =
			typeof amount === 'string' ? Number(amount) : (amount ?? NaN);
		if (amount === '' || amount === null || amount === undefined) {
			throw new ApiError(400, 'Amount is required.');
		}
		if (!Number.isFinite(parsedAmount)) {
			throw new ApiError(400, 'Amount must be a valid number.');
		}

		const parsedDate = date ? new Date(date) : null;
		if (!parsedDate || Number.isNaN(parsedDate.getTime())) {
			throw new ApiError(400, 'Date is invalid.');
		}
		const newExpense = new Expense({
			userId,
			icon,
			category,
			amount: parsedAmount,
			date: parsedDate,
		});
		await newExpense.save();
		res.status(200).json({ newExpense });
	} catch (error) {
		return next(error);
	}
};

// Get All Expense
exports.getAllExpense = async (req, res, next) => {
	const userId = req.user.id;

	try {
		const expense = await Expense.find({ userId }).sort({ date: -1 });
		res.json({ expense });
	} catch (error) {
		return next(error);
	}
};

// Delete Expense
exports.deleteExpense = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const { id } = req.params;

		if (!isValidObjectId(id)) {
			throw new ApiError(400, 'Invalid expense id.');
		}

		const deleted = await Expense.findOneAndDelete({ _id: id, userId });
		if (!deleted) {
			throw new ApiError(404, 'Expense not found.');
		}

		res.json({ message: 'Expense deleted successfully.' });
	} catch (error) {
		return next(error);
	}
};

// Download Expense to Excel Format
exports.downloadExpenseExcel = async (req, res, next) => {
	const userId = req.user.id;
	try {
		const expense = await Expense.find({ userId }).sort({ date: -1 });

		// Prepare data for Excel
		const data = expense.map((item) => ({
			Category: item.category,
			Amount: item.amount,
			Date: item.date,
		}));

		// Create a new excel file sheet with the data
		const wb = xlsx.utils.book_new();
		const ws = xlsx.utils.json_to_sheet(data);
		xlsx.utils.book_append_sheet(wb, ws, 'Expense');

		const buffer = xlsx.write(wb, {
			type: 'buffer',
			bookType: 'xlsx',
		});

		res.setHeader(
			'Content-Disposition',
			'attachment; filename="expense_details.xlsx"'
		);
		res.setHeader(
			'Content-Type',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		);
		return res.send(buffer);
	} catch (error) {
		return next(error);
	}
};
