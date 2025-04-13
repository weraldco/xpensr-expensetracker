/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import {
	Area,
	AreaChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	TooltipProps,
	XAxis,
	YAxis,
} from 'recharts';
import { ChartDataT } from '../Dashboard/Last30DaysExpensesChart';

interface Props {
	data: ChartDataT[];
}

const CustomLineChart: FC<Props> = ({ data }) => {
	const CustomTooltip = ({ active, payload }: TooltipProps<any, any>) => {
		if (active && payload && payload.length) {
			return (
				<div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
					<p className="text-xs font-semibold text-purple-800 mb-1">
						{payload[0].payload.category}
					</p>
					<p className="text-sm text-gray-600 ">
						Amount:
						<span className="text-sm font-medium text-gray-900">
							${payload[0].payload.amount}
						</span>
					</p>
				</div>
			);
		}
		return null;
	};
	return (
		<div className="bg-white mt-6">
			<ResponsiveContainer width="100%" height={300}>
				<AreaChart data={data}>
					<defs>
						<linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5% " stopColor="#875cf5" stopOpacity="0.4" />
							<stop offset="95% " stopColor="#875cf5" stopOpacity="0" />
						</linearGradient>
					</defs>
					<CartesianGrid stroke="none" />
					<XAxis
						dataKey="month"
						tick={{ fontSize: 12, fill: '#555' }}
						stroke="none"
					/>
					<YAxis tick={{ fontSize: 12, fill: '#555' }} stroke="none" />

					<Tooltip content={CustomTooltip} />
					<Area
						type="monotone"
						dataKey="amount"
						stroke="#875cf5"
						fill="url(#incomeGradient)"
						strokeWidth={3}
						dot={{ r: 3, fill: '#ab8df8' }}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};

export default CustomLineChart;
