import { formatAmount, formatDate } from '@/utils/helper';
import { FC } from 'react';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import { MdOutlineShoppingCart } from 'react-icons/md';

interface DataT {
	amount: number;
	category?: string;
	source?: string;
	date: Date;
	icon?: string;
	type: string;
}
interface Props {
	data: DataT;
}

const TransactionItem: FC<Props> = ({ data }) => {
	const { amount, category, source, date, icon, type } = data;

	return (
		<div className="group flex items-center justify-between text-[0.85em] hover:bg-gray-50 p-2 duration-200">
			<div className="flex gap-4 items-center">
				<div className="p-4 bg-gray-100 rounded-full">
					{icon ? icon : <MdOutlineShoppingCart size={22} />}
				</div>
				<div>
					<h2 className="font-semibold">{!category ? source : category}</h2>
					<span className=" text-gray-500 ">{formatDate(date)}</span>
				</div>
			</div>
			<div
				className={`${type}  font-bold flex items-center gap-2 p-2 rounded-md`}
			>
				<span>
					{type === 'expense' ? '-' : '+'} {formatAmount(amount)}
				</span>
				{type === type ? (
					<FaArrowTrendDown size={18} />
				) : (
					<FaArrowTrendUp size={18} />
				)}
			</div>
		</div>
	);
};

export default TransactionItem;
