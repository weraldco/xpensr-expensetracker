const Income = require('../models/Income');
const Expense = require('../models/Expense');

const { Types } = require('mongoose');

// Dashboard Data
exports.getDashboardData = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const userObjectId = new Types.ObjectId(String(userId));
		// Fetch total income & expenses
		const totalIncome = await Income.aggregate([
			{ $match: { userId: userObjectId } },
			{ $group: { _id: null, total: { $sum: '$amount' } } },
		]);

		const totalExpenses = await Expense.aggregate([
			{ $match: { userId: userObjectId } },
			{ $group: { _id: null, total: { $sum: '$amount' } } },
		]);

		// Get income transanctions in the last 60 days
		const last60DaysIncomeTransactions = await Income.find({
			userId,
			date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
		}).sort({ date: -1 });

		// Get total income for the last 60 days
		const incomeLast60Days = last60DaysIncomeTransactions.reduce(
			(sum, transaction) => sum + transaction.amount,
			0
		);

		// Get expenses transaction in the last 30 days
		const last30DaysExpensesTransactions = await Expense.find({
			userId,
			date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
		}).sort({ date: -1 });

		// Get total expenses for the last 30 days
		const expensesLast30Days = last30DaysExpensesTransactions.reduce(
			(sum, transaction) => sum + transaction.amount,
			0
		);

		// Fetch last 5 transaction (income + expenses)
		const lastTransactions = [
			...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
				(txn) => ({
					...txn.toObject(),
					type: 'income',
				})
			),
			...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
				(txn) => ({
					...txn.toObject(),
					type: 'expense',
				})
			),
		].sort((a, b) => b.date - a.date); // Sort latest first

		// Final API Response

		res.status(200).json({
			totalBalance:
				(totalIncome[0]?.total || 0) - (totalExpenses[0]?.total || 0),
			totalIncome: totalIncome[0]?.total || 0,
			totalExpenses: totalExpenses[0]?.total || 0,
			last30DaysExpenses: {
				total: expensesLast30Days,
				transaction: last30DaysExpensesTransactions,
			},
			last60DaysIncome: {
				total: incomeLast60Days,
				transaction: last60DaysIncomeTransactions,
			},
			recentTransactions: lastTransactions,
		});
	} catch (error) {
		return next(error);
	}
};
