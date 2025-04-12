import { prepareIncomeBarChartData } from '@/utils/helper';
import { TransactionT } from '@/utils/types';
import { FC, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import CustomBarChart from '../Charts/CustomBarChart';
import { ChartDataT } from '../Dashboard/Last30DaysExpensesChart';
interface Props {
	transactions: TransactionT[] | [];
	onAddIncome: () => void;
}

const IncomeOverview: FC<Props> = ({ transactions, onAddIncome }) => {
	const [chartData, setChartData] = useState<ChartDataT[] | []>([]);

	useEffect(() => {
		const result = prepareIncomeBarChartData(transactions);
		setChartData(result);

		return () => {};
	}, [transactions]);

	console.log(chartData);

	return (
		<div className="card">
			<div className="flex items-center justify-between">
				<div>
					<h5 className="poppins-semibold">Income Overview</h5>
					<span className="text-xs text-gray-500">
						Track your earnings over time and analyze your income trends.
					</span>
				</div>
				<button
					className="card-btn text-violet-600 text-[0.85rem] font-bold"
					onClick={onAddIncome}
				>
					<FaPlus size={14} />
					Add Income
				</button>
			</div>
			<div className="mt-10">
				<CustomBarChart data={chartData} />
			</div>
		</div>
	);
};

export default IncomeOverview;
