import { FC } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { IoWalletOutline } from 'react-icons/io5';
import { LuWalletCards } from 'react-icons/lu';
import { PiHandCoins } from 'react-icons/pi';
import HeadExpenseItem from '../HeadExpenseItem';
import TransactionItem from '../TransactionItem';

interface Props {}

const Home: FC<Props> = () => {
	return (
		<div>
			<div className="flex gap-4 w-full">
				<HeadExpenseItem
					icon={<IoWalletOutline size={20} />}
					title="Total Balance"
					amount="$89,200"
					className="bg-violet-500"
				/>
				<HeadExpenseItem
					icon={<PiHandCoins size={20} />}
					title="Total Income"
					amount="$89,200"
					className="bg-orange-400"
				/>
				<HeadExpenseItem
					icon={<LuWalletCards size={20} />}
					title="Total Expenses"
					amount="$89,200"
					className="bg-red-400"
				/>
			</div>
			<div className="p-4 bg-white rounded-md flex flex-col gap-4">
				<div className="flex justify-between items-center">
					<h1 className="text-xl font-semibold">Recent Transactions</h1>
					<div className="text-xs px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 duration-200 cursor-pointer active:bg-gray-300 flex gap-2">
						<span>See All</span> <BsArrowRight size={15} />
					</div>
				</div>
				<div className="flex flex-col">
					<TransactionItem type="expense" />
					<TransactionItem type="income" />
					<TransactionItem type="expense" />
					<TransactionItem type="income" />
					<TransactionItem type="expense" />
					<TransactionItem type="income" />
				</div>
			</div>
		</div>
	);
};

export default Home;
