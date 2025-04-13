import {
	prepareExpenseLineChartData,
	prepareIncomeBarChartData,
} from '@/utils/helper';
import { TransactionT } from '@/utils/types';
import { FC, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import CustomBarChart from './Charts/CustomBarChart';
import CustomLineChart from './Charts/CustomLineChart';
import { ChartDataT } from './Dashboard/Last30DaysExpensesChart';
interface Props {
	transactions: TransactionT[] | [];
	onAdd: () => void;
	title: string;
	subtitle: string;
	btnLabel: string;
	chartType: string;
}

const DataOverviews: FC<Props> = ({
	transactions,
	onAdd,
	title,
	subtitle,
	btnLabel,
	chartType,
}) => {
	const [chartData, setChartData] = useState<ChartDataT[] | []>([]);

	useEffect(() => {
		let result;
		if (chartType === 'barchart') {
			result = prepareIncomeBarChartData(transactions);
		} else if (chartType === 'linechart') {
			result = prepareExpenseLineChartData(transactions);
		} else {
			result = prepareExpenseLineChartData(transactions);
		}
		setChartData(result);

		return () => {};
	}, [transactions]);

	return (
		<div className="card">
			<div className="flex items-center justify-between">
				<div>
					<h5 className="poppins-semibold">{title}</h5>
					<span className="text-xs text-gray-500">{subtitle}</span>
				</div>
				<button
					className="card-btn text-violet-600 text-[0.85rem] font-bold"
					onClick={onAdd}
				>
					<FaPlus size={14} />
					{btnLabel}
				</button>
			</div>
			<div className="mt-10">
				<CustomLineChart data={chartData} />
			</div>
		</div>
	);
};

export default DataOverviews;
