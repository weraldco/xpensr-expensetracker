const User = require('../models/User');
const xlsx = require('xlsx');
const Income = require('../models/Income');
const { isValidObjectId } = require('mongoose');
const { ApiError } = require('../middleware/errorMiddleware');

// Add Income
exports.addIncome = async (req, res, next) => {
	const userId = req.user.id;
	try {
		const { icon, source, amount, date } = req.body;
		if (typeof source !== 'string' || !source.trim()) {
			throw new ApiError(400, 'Source is required.');
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
		const newIncome = new Income({
			userId,
			icon,
			source,
			amount: parsedAmount,
			date: parsedDate,
		});
		await newIncome.save();
		res.status(200).json({ newIncome });
	} catch (error) {
		return next(error);
	}
};

// Get All Income
exports.getAllIncome = async (req, res, next) => {
	const userId = req.user.id;

	try {
		const income = await Income.find({ userId }).sort({ date: -1 });
		res.json({ income });
	} catch (error) {
		return next(error);
	}
};

// Delete Income
exports.deleteIncome = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const { id } = req.params;

		if (!isValidObjectId(id)) {
			throw new ApiError(400, 'Invalid income id.');
		}

		const deleted = await Income.findOneAndDelete({ _id: id, userId });
		if (!deleted) {
			throw new ApiError(404, 'Income not found.');
		}

		res.json({ message: 'Income deleted successfully.' });
	} catch (error) {
		return next(error);
	}
};

// Download Income to Excel Format
exports.downloadIncomeExcel = async (req, res, next) => {
	const userId = req.user.id;
	try {
		const income = await Income.find({ userId }).sort({ date: -1 });

		// Prepare data for Excel
		const data = income.map((item) => ({
			Source: item.source,
			Amount: item.amount,
			Date: item.date,
		}));
		const wb = xlsx.utils.book_new();
		const ws = xlsx.utils.json_to_sheet(data);
		xlsx.utils.book_append_sheet(wb, ws, 'Income');

		const buffer = xlsx.write(wb, {
			type: 'buffer',
			bookType: 'xlsx',
		});

		res.setHeader(
			'Content-Disposition',
			'attachment; filename="income_details.xlsx"'
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
