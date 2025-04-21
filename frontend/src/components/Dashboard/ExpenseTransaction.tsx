import { last30DaysExpensesT } from '@/utils/types';
import { FC } from 'react';
import SeeAllBtn from '../SeeAllBtn';
import TransactionItem from '../TransactionItem';

interface Props {
	transactions: last30DaysExpensesT;
}

const ExpenseTransaction: FC<Props> = ({ transactions }) => {
	const { transaction } = transactions;

	return (
		<div className="card poppins-regular">
			<div className="flex justify-between items-center">
				<h5 className="text-base poppins-semibold text-gray-600">Expenses</h5>
				<SeeAllBtn redirectTo={'/expenses'} />
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
