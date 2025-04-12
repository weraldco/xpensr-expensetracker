import { formatAmount, formatDate } from '@/utils/helper';
import { TransactionT } from '@/utils/types';
import { FC } from 'react';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import { MdOutlineDelete, MdOutlineShoppingCart } from 'react-icons/md';

// interface DataT {
// 	_id: string | undefined;
// 	amount: number;
// 	category?: string;
// 	source?: string;
// 	date: Date;
// 	icon?: string;
// 	type: string;
// }

interface Props {
	data: TransactionT;
	optType?: string;
	btnDeleteShow?: boolean;
	onClick: (id: string) => void;
}

const TransactionItem: FC<Props> = ({
	data,
	optType,
	btnDeleteShow,
	onClick,
}) => {
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
				{btnDeleteShow && (
					<button
						className="group-hover:block hidden duration-200 cursor-pointer"
						onClick={() => onClick(data._id as string)}
					>
						<MdOutlineDelete
							size={20}
							className="text-gray-400 hover:text-violet-500 active:text-violet-800"
						/>
					</button>
				)}
				<div
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
				</div>
			</div>
		</div>
	);
};

export default TransactionItem;
