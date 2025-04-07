import { formatAmount } from '@/utils/helper';
import { FC, ReactElement } from 'react';

interface Props {
	icon: ReactElement;
	title: string;
	amount: number;
	className?: string;
}

const HeadExpenseItem: FC<Props> = ({ icon, title, amount, className }) => {
	return (
		<div className="card  flex items-center justify-start gap-4 w-full">
			<div
				className={`text-white rounded-full p-3 shadow-md shadow-gray-200 ${className}`}
			>
				{icon}
			</div>
			<div className="flex flex-col gap-2">
				<h1 className="text-xs">{title}</h1>
				<span className="poppins-semibold text-xl">{formatAmount(amount)}</span>
			</div>
		</div>
	);
};

export default HeadExpenseItem;
