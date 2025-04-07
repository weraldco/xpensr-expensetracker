import { last60DaysIncomeT } from '@/utils/types';
import { FC } from 'react';
import { FaPlus } from 'react-icons/fa';
import SeeAllBtn from '../SeeAllBtn';
import TransactionItem from '../TransactionItem';

interface Props {
	transactions: last60DaysIncomeT;
}

const IncomeTransactions: FC<Props> = ({ transactions }) => {
	const { total, transaction } = transactions;
	console.log(total);
	return (
		<div className="card poppins-regular">
			<div className="flex justify-between items-center">
				<h5 className="text-base poppins-semibold text-gray-600">
					Income Overview
				</h5>
				{/* <SeeAllBtn redirectTo="/" /> */}
				<button className="card-btn">
					<FaPlus /> Add Income
				</button>
			</div>

			<div>
				{transaction.map((transaction) => (
					<TransactionItem data={transaction} optType="income" />
				))}
			</div>
		</div>
	);
};

export default IncomeTransactions;
