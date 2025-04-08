import { ExpenseT } from './types';

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

export const prepareExpenseBarChartData = (data: ExpenseT[] = []) => {
	const chartData = data.map((item) => ({
		category: item?.category,
		amount: item?.amount,
	}));

	return chartData;
};
