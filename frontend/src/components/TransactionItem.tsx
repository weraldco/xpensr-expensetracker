import { formatAmount, formatDate } from '@/utils/helper';
import { TransactionT } from '@/utils/types';
import { FC } from 'react';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import { MdOutlineDelete, MdOutlineShoppingCart } from 'react-icons/md';

interface Props {
	data: TransactionT;
	optType?: string;
	onClick?: (id: string) => void;
}

const TransactionItem: FC<Props> = ({ data, optType, onClick }) => {
	const type = data.type === undefined ? optType : data.type;
	return (
		<div className="group flex items-center justify-between text-[0.85em] hover:bg-gray-50 p-2 duration-200">
			<div className="flex gap-4 items-center">
				<div className="p-4 bg-gray-100 rounded-full">
					{data.icon ? (
						<img src={data.icon} alt="Icon" className="h-7 w-7" />
					) : (
						<MdOutlineShoppingCart size={22} />
					)}
				</div>
				<div>
					<h2 className="font-semibold text-sm">
						{!data.category ? data.source : data.category}
					</h2>
					<span className=" text-gray-500 text-xs">
						{formatDate(data.date)}
					</span>
				</div>
			</div>
			<div className="group flex gap-2 duration-200">
				{onClick && (
					<button
						className="group-hover:block hidden duration-200 cursor-pointer"
						onClick={() => {
							onClick(data._id as string);
						}}
					>
						<MdOutlineDelete
							size={20}
							className="text-gray-400 hover:text-red-500 active:text-red-800"
						/>
					</button>
				)}
				{type === 'expense' ? (
					<div className="transaction-card bg-red-100 text-red-400">
						{formatAmount(data.amount)}
						<FaArrowTrendDown size={18} />
					</div>
				) : (
					<div className="transaction-card bg-green-100 text-green-400">
						{formatAmount(data.amount)}
						<FaArrowTrendUp size={18} />
					</div>
				)}

				{/* <div
					className={`${
						data.type || optType
					} text-xs font-bold flex items-center gap-2 p-2 rounded-md`}
				>
					<span>
						{data.type === 'expense' ? '-' : '+'} {formatAmount(data.amount)}
					</span>
					{data.type === data.type ? (
						<FaArrowTrendDown size={18} />
					) : (
						<FaArrowTrendUp size={18} />
					)}
				</div> */}
			</div>
		</div>
	);
};

export default TransactionItem;
