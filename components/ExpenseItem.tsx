import { FC } from 'react';

interface Props {
	expenseName: string;
	date: string;
	type: string;
	payment: string;
	amount: string;
}

const ExpenseItem: FC<Props> = ({
	expenseName,
	date,
	type,
	payment,
	amount,
}) => {
	return (
		<div className="grid grid-cols-4 gap-25 justify-evenly items-start">
			<div className="flex flex-col">
				<span className="font-bold">{expenseName}</span>
				<span className="text-xs text-gray-500">{date}</span>
			</div>
			<div className="text-sm">{type}</div>
			<div className="text-sm italic">{payment}</div>
			<div className="font-bold">{amount}</div>
		</div>
	);
};

export default ExpenseItem;
