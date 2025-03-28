import { FC } from 'react';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import { MdOutlineShoppingCart } from 'react-icons/md';

interface Props {
	type: string;
}

const TransactionItem: FC<Props> = ({ type }) => {
	return (
		<div className="group flex items-center justify-between text-[0.85em] hover:bg-gray-50 p-2 duration-200">
			<div className="flex gap-4">
				<div className="p-4 bg-gray-100 rounded-full">
					<MdOutlineShoppingCart size={22}></MdOutlineShoppingCart>
				</div>
				<div>
					<h2 className="font-semibold">Shopping</h2>
					<span className=" text-gray-500 ">17th Feb 2025</span>
				</div>
			</div>
			<div
				className={`${type}  font-bold flex items-center gap-2 p-2 rounded-md`}
			>
				<span>{type === 'expense' ? '-' : '+'} $430</span>
				{type === 'expense' ? (
					<FaArrowTrendDown size={18} />
				) : (
					<FaArrowTrendUp size={18} />
				)}
			</div>
		</div>
	);
};

export default TransactionItem;
