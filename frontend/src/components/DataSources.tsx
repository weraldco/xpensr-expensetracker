import { TransactionT } from '@/utils/types';
import { FC } from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionItem from './TransactionItem';

interface Props {
	transactions: TransactionT[] | null;
	subHeading?: string;
	onDelete: (id: string) => void;
	onDownload: () => void;
	title: string;
	optType?: string;
}

const DataSources: FC<Props> = ({
	transactions,
	subHeading,
	onDelete,
	title,
	onDownload,
	optType,
}) => {
	return (
		<div className="card">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h5 className="poppins-semibold">{title}</h5>
					<span className="text-xs text-gray-500">{subHeading}</span>
				</div>
				<button className="card-btn" onClick={onDownload}>
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
							optType={optType}
							onClick={onDelete}
						/>
					))}
			</div>
		</div>
	);
};

export default DataSources;
