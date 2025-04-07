import FinancialOverview from '@/components/Dashboard/FinancialOverview';
import RecentTransactions from '@/components/Dashboard/RecentTransactions';
import HeadExpenseItem from '@/components/HeadExpenseItem';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LoadingState from '@/components/LoadingState';
import { UserContext } from '@/context/userContext';
import { useContext } from 'react';
import { IoWalletOutline } from 'react-icons/io5';
import { LuWalletCards } from 'react-icons/lu';
import { PiHandCoins } from 'react-icons/pi';

const Home = () => {
	const { dashboardData } = useContext(UserContext);

	return (
		<DashboardLayout activeMenu="Dashboard">
			{dashboardData ? (
				<div className="flex flex-col gap-4 pt-[20px]">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
						<HeadExpenseItem
							icon={<IoWalletOutline size={20} />}
							title="Total Balance"
							amount={dashboardData?.totalBalance}
							className="bg-violet-500"
						/>
						<HeadExpenseItem
							icon={<PiHandCoins size={20} />}
							title="Total Income"
							amount={dashboardData?.totalIncome}
							className="bg-orange-400"
						/>
						<HeadExpenseItem
							icon={<LuWalletCards size={20} />}
							title="Total Expenses"
							amount={dashboardData?.totalExpenses}
							className="bg-red-400"
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<RecentTransactions
							transactions={dashboardData?.recentTransactions}
						/>

						<FinancialOverview
							totalBalance={dashboardData?.totalBalance || 0}
							totalExpenses={dashboardData.totalExpenses || 0}
							totalIncome={dashboardData.totalIncome || 0}
						/>
					</div>
				</div>
			) : (
				<LoadingState></LoadingState>
			)}
		</DashboardLayout>
	);
};

export default Home;
