import ExpenseItem from '@/components/ExpenseItem';
import { Gugi, Inter } from 'next/font/google';
import { geistMono } from './layout';

const gugiFont = Gugi({ subsets: ['latin'], weight: '400' });
const interFont = Inter({ subsets: ['latin'], weight: '400' });

export default function Home() {
	return (
		<div className={``}>
			{/* Spend this week */}
			<div className="flex flex-col justify-center items-center">
				<div className={`${geistMono.className} text-sm`}>
					(Spend this week)
				</div>
				<div className="flex ">
					<span className="text-[50px] py-5 px-2"> ₱ </span>{' '}
					<span className={`text-[100px] ${gugiFont.className} `}>341</span>
					<span className={`text-[60px] py-3 ${gugiFont.className}`}>.25</span>
				</div>
			</div>
			<div className={`${interFont.className} flex text-base  flex-col gap-4`}>
				<div className="flex flex-col">
					<span className=" font-bold text-xl">Transactions</span>
					<span className="text-xs text-gray-500">
						You had 2 incomes and 23 expenses this month.
					</span>
				</div>
				<div className="flex flex-col gap-4">
					<span className="text-gray-500">Today</span>
					<div className="flex flex-col gap-4">
						<ExpenseItem
							expenseName="Netflix"
							date="Mar 13, Thurs"
							type="Entertainment"
							payment="Gcash"
							amount="P500.00"
						/>
						<ExpenseItem
							expenseName="Netflix"
							date="Mar 13, Thurs"
							type="Entertainment"
							payment="Gcash"
							amount="P350.00"
						/>
						<ExpenseItem
							expenseName="Netflix"
							date="Mar 13, Thurs"
							type="Entertainment"
							payment="Credit Card"
							amount="P200.00"
						/>
						<ExpenseItem
							expenseName="Netflix"
							date="Mar 13, Thurs"
							type="Entertainment"
							payment="Cash"
							amount="P167.00"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
