import { TooltipProps } from 'recharts';

type TooltipValue = number | string | undefined;
type TooltipName = string | undefined;

const CustomTooltip = ({
	active,
	payload,
}: TooltipProps<TooltipValue, TooltipName>) => {
	if (!active || !payload || payload.length === 0) return null;

	const first = payload[0];
	if (!first) return null;

	const name = first.name ?? '';
	const value = first.value;

	if (value === undefined) return null;

	return (
		<div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
			<p className="text-xs font-semibold text-purple-800 mb-1">{name}</p>
			<p className="text-sm text-gray-600">
				Amount:
				<span className="text-sm font-medium text-gray-900">${value}</span>
			</p>
		</div>
	);
};

export default CustomTooltip;
