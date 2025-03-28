import { FC, ReactElement } from 'react';

interface Props {
	icon: ReactElement;
	title: string;
	amount: string;
	className?: string;
}

const HeadExpenseItem: FC<Props> = ({ icon, title, amount, className }) => {
	return (
		<div className="flex items-center  justify-start gap-4 py-4 px-4 bg-white rounded-md w-full shadow-md shadow-gray-200">
			<div className={`text-white rounded-full p-3 ${className}`}>{icon}</div>
			<div>
				<h1 className="text-[0.7em]">{title}</h1>
				<span className="font-bold">{amount}</span>
			</div>
		</div>
	);
};

export default HeadExpenseItem;
