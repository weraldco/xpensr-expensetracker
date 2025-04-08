import { FC } from 'react';
import { ChartDataT } from '../Dashboard/Last30DaysExpenses';

import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

interface Props {
	data: ChartDataT[];
}

const CustomBarChart: FC<Props> = ({ data }) => {
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
						activeDot={{ r: 8, fill: 'yellow' }}
						activeStyle={{ fill: 'green' }}
					>
						{data.map((entry, index) => (
							<Cell key={index} fill={getBarColor(index)} />
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default CustomBarChart;
