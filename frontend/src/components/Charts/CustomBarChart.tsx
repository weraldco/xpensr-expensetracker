import { FC } from 'react';
import { ChartDataT } from '../Dashboard/Last30DaysExpensesChart';

import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	ResponsiveContainer,
	Tooltip,
	TooltipProps,
	XAxis,
	YAxis,
} from 'recharts';

interface Props {
	data: ChartDataT[];
}

const CustomBarChart: FC<Props> = ({ data }) => {
	const getBarColor = (index: number) => {
		return index % 2 === 0 ? '#875cf5' : '#cfbefb';
	};

	const CustomTooltip = ({
		active,
		payload,
	}: TooltipProps<number | string, string>) => {
		if (!active || !payload || payload.length === 0) return null;

		const first = payload[0];
		const data = first?.payload as {
			category?: string;
			amount?: number;
		};

		return (
			<div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
				<p className="text-xs font-semibold text-purple-800 mb-1">
					{data?.category ?? ''}
				</p>
				<p className="text-sm text-gray-600 ">
					Amount:
					<span className="text-sm font-medium text-gray-900">
						${data?.amount ?? ''}
					</span>
				</p>
			</div>
		);
	};
	return (
		<div className="bg-white mt-6">
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={data}>
					<CartesianGrid stroke="none" />
					<XAxis dataKey="month" tick={{ fontSize: 12, fill: '#555' }} />
					<YAxis tick={{ fontSize: 12, fill: '#555' }} stroke="none" />

					<Tooltip content={CustomTooltip} />
					<Bar
						dataKey="amount"
						fill="$FF8042"
						radius={[10, 10, 0, 0]}
						// activeDot={{ r: 8, fill: 'yellow' }}
						// activeStyle={{ fill: 'green' }}
					>
						{data.map((_, index) => (
							<Cell key={index} fill={getBarColor(index)} />
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default CustomBarChart;
