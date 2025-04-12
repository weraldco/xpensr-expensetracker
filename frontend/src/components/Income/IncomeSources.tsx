import { TransactionT } from '@/utils/types';
import { FC } from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionItem from '../TransactionItem';

interface Props {
	transactions: TransactionT[] | null;
	onDelete: (id: string) => void;
	onDownload: () => void;
}

const IncomeSources: FC<Props> = ({ transactions, onDelete, onDownload }) => {
	return (
		<div className="card">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h5 className="poppins-semibold">Income Sources</h5>
					<span className="text-xs text-gray-500">
						Track your earnings over time and analyze your income trends.
					</span>
				</div>
				<button className="card-btn">
					<LuDownload size={18} />
					Download
				</button>
			</div>
			{/* Content */}
			<div className="grid grid-cols-1 md:grid-cols-2">
				{transactions &&
					transactions.map((transaction, index) => (
						<TransactionItem
							data={transaction}
							key={index}
							optType="income"
							btnDeleteShow
							onClick={onDelete}
						/>
					))}
			</div>
		</div>
	);
};

export default IncomeSources;
