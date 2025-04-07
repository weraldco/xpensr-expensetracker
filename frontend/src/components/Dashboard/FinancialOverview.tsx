import { FC } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

interface Props {
	totalBalance: number;
	totalExpenses: number;
	totalIncome: number;
}

const FinancialOverview: FC<Props> = ({
	totalBalance,
	totalExpenses,
	totalIncome,
}) => {
	const COLORS = ['#8e51ff', '#de5454', '#67c254'];
	const balanceData = [
		{ name: 'Total Balance', amount: totalBalance },
		{ name: 'Total Expenses', amount: totalExpenses },
		{ name: 'Total Income', amount: totalIncome },
	];
	return (
		<div className=" card flex flex-col gap-4 w-full">
			<div>
				<span className="poppins-semibold">Financial Overview</span>
			</div>

			<CustomPieChart
				data={balanceData}
				label="Total Balace"
				totalAmount={`$${totalBalance}`}
				colors={COLORS}
				showTextAnhor
			/>
		</div>
	);
};

export default FinancialOverview;
