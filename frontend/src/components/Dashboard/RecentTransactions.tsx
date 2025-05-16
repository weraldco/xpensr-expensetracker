import { TransactionT } from '@/utils/types';
import SeeAllBtn from '../SeeAllBtn';
import TransactionItem from '../TransactionItem';

interface TransactionType {
	transactions: TransactionT[];
}

const RecentTransactions = ({ transactions }: TransactionType) => {
	return (
		<div className="card flex flex-col gap-4 w-full">
			<div className="flex justify-between items-center">
				<h1 className="text-md  poppins-semibold">Recent Transactions</h1>
				<SeeAllBtn redirectTo="/" />
			</div>
			<div className="flex flex-col ">
				{transactions?.map((data, i) => (
					<TransactionItem data={data} key={i} optType={data.type} />
				))}
			</div>
		</div>
	);
};

export default RecentTransactions;
