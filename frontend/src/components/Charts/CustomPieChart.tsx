import { FC } from 'react';
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from 'recharts';
import CustomLegend from './CustomLegend';
import CustomTooltip from './CustomTooltip';

export interface DataT {
	name: string | undefined;
	amount: number;
}

interface Props {
	data: DataT[] | undefined;
	label: string;
	totalAmount: string;
	colors: string[];
	showTextAnhor: boolean;
}

const CustomPieChart: FC<Props> = ({
	data,
	label,
	totalAmount,
	colors,
	showTextAnhor,
}) => {
	return (
		<ResponsiveContainer width="100%" height={380}>
			<PieChart>
				<Pie
					data={data}
					dataKey="amount"
					nameKey="name"
					cx="50%"
					cy="50%"
					outerRadius={130}
					innerRadius={100}
					labelLine={false}
				>
					{data !== undefined &&
						data.map((_, index) => (
							<Cell key={`cell-${index}`} fill={colors[index]} />
						))}
				</Pie>
				<Tooltip content={<CustomTooltip />} />
				<Legend content={<CustomLegend payload={[]} />} />
				{showTextAnhor && (
					<>
						<text
							x="50%"
							y="50%"
							dy={-25}
							textAnchor="middle"
							fill="#666"
							fontSize="14px"
						>
							{label}
						</text>
						<text
							x="50%"
							y="50%"
							dy={8}
							textAnchor="middle"
							fill="#333"
							fontSize="24px"
							fontWeight="semi-bold"
						>
							{totalAmount}
						</text>
					</>
				)}
			</PieChart>
		</ResponsiveContainer>
	);
};

export default CustomPieChart;
