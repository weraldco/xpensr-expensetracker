import { last30DaysExpensesT } from '@/utils/types';
import { FC } from 'react';
import SeeAllBtn from '../SeeAllBtn';
import TransactionItem from '../TransactionItem';

interface Props {
	transactions: last30DaysExpensesT;
}

const ExpenseTransaction: FC<Props> = ({ transactions }) => {
	const { total, transaction } = transactions;
	console.log(total);
	return (
		<div className="card poppins-regular">
			<div className="flex justify-between items-center">
				<h5 className="text-base poppins-semibold text-gray-600">Expenses</h5>
				<SeeAllBtn redirectTo={'/'} />
			</div>

			<div>
				{transaction.map((transaction, index) => (
					<TransactionItem key={index} data={transaction} optType="expense" />
				))}
			</div>
		</div>
	);
};

export default ExpenseTransaction;
