import moment from 'moment';
import { TransactionT } from './types';

export const getInitials = (name: string | undefined) => {
	if (!name) return '';

	const splitNames = name.split(' ');
	let initials = '';

	for (let i = 0; i < splitNames.length; i++) {
		initials += splitNames[i].split('').splice(0, 1);
	}
	return initials;
};

export const formatAmount = (number: number) => {
	const centavos = number.toFixed(2).toString().split('.')[1];

	const amount = Number(
		number.toFixed(2).toString().split('.')[0]
	).toLocaleString();

	return `$ ${amount}.${centavos}`;
};

export const formatDate = (date: Date) => {
	// const d = new Date(date);
	// const day = d.getDate();
	// const monthYear = d.toLocaleDateString('en-EN', {
	// 	month: 'short',
	// 	year: 'numeric',
	// });
	return new Date(date).toLocaleDateString('en-EN', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	});

	// return `${day} ${monthYear}`;
};

export const prepareExpenseBarChartData = (data: TransactionT[] | [] = []) => {
	const chartData = data.map((item) => ({
		category: item?.category,
		amount: item?.amount,
	}));

	return chartData;
};

export const prepareIncomeBarChartData = (data: TransactionT[] | [] = []) => {
	const sortedData = [...data].sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
	);

	const charData = sortedData.map((item) => ({
		month: moment(item.date).format('Do MMM'),
		amount: item.amount,
		source: item.source,
	}));

	return charData;
};
export const prepareExpenseLineChartData = (data: TransactionT[] | [] = []) => {
	const sortedData = [...data].sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
	);

	const charData = sortedData.map((item) => ({
		month: moment(item.date).format('Do MMM'),
		amount: item.amount,
		source: item.source,
	}));
	return charData;
};
