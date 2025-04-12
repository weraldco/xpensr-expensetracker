import { prepareExpenseBarChartData } from '@/utils/helper';
import { ExpenseT } from '@/utils/types';
import { FC, useEffect, useState } from 'react';
import CustomBarChart from '../Charts/CustomBarChart';

interface Props {
	data: ExpenseT[];
}

export interface ChartDataT {
	category?: string | undefined;
	source?: string | undefined;
	amount: number;
}

const Last30DaysExpensesChart: FC<Props> = ({ data }) => {
	const [chartData, setChartData] = useState<ChartDataT[] | []>([]);

	useEffect(() => {
		const result = prepareExpenseBarChartData(data);
		setChartData(result);
	}, [data]);
	return (
		<div className="card col-span-1">
			<div className="flex items-center justify-between">
				<h5>Last 30 Days Expenses</h5>
			</div>
			<CustomBarChart data={chartData} />
		</div>
	);
};

export default Last30DaysExpensesChart;
