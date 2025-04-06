export const getInitials = (name: string) => {
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
	return new Date(date).toLocaleDateString('en-EN', {
		weekday: 'short',
		month: 'short',
		day: '2-digit',
		year: 'numeric',
	});
};
