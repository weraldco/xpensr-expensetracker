import { FC, useEffect, useState } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';
import { ChartDataT } from './Last30DaysExpensesChart';

const COLORS = ['#8e51ff', '#de5454', '#f78907', '#4B097B', '#FA1ABE'];

interface Props {
	data: ChartDataT[];
	totalIncome: number;
}

interface DataType {
	name: string;
	amount: number;
}

const Last60DaysIncomeChart: FC<Props> = ({ data, totalIncome }) => {
	const [chartData, setChartData] = useState<DataType[] | undefined>(undefined);
	const prepareChartData = () => {
		const dataArr: DataType[] = data?.map((item) => ({
			name: item.source || '',
			amount: item.amount,
		}));
		setChartData(dataArr);
	};

	useEffect(() => {
		prepareChartData();

		return () => {};
	}, [data]);

	return (
		<div className="card">
			<div className="flex items-center justify-between">
				<h5 className="text-lg"> Last 60 Days Income</h5>
			</div>
			<CustomPieChart
				data={chartData}
				label="Total Income"
				totalAmount={`$${totalIncome}`}
				showTextAnhor
				colors={COLORS}
			/>
		</div>
	);
};

export default Last60DaysIncomeChart;
