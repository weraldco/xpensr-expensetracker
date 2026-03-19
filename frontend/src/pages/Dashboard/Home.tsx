import ExpenseTransaction from '@/components/Dashboard/ExpenseTransaction';
import FinancialOverview from '@/components/Dashboard/FinancialOverview';
import IncomeTransactions from '@/components/Dashboard/IncomeTransactions';
import Last30DaysExpenses from '@/components/Dashboard/Last30DaysExpensesChart';
import Last60DaysIncome from '@/components/Dashboard/Last60DaysIncomeChart';
import RecentTransactions from '@/components/Dashboard/RecentTransactions';
import HeadExpenseItem from '@/components/HeadExpenseItem';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LoadingState from '@/components/LoadingState';
import { DashboardDataT } from '@/utils/types';
import { useCallback, useEffect, useState } from 'react';
import { IoWalletOutline } from 'react-icons/io5';
import { LuWalletCards } from 'react-icons/lu';
import { PiHandCoins } from 'react-icons/pi';
import { getDashboardData as fetchDashboardDataApi } from '@/services/dashboardService';

const Home = () => {
	const [dashboardData, setDashboardData] = useState<DashboardDataT | null>(
		null
	);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const fetchDashboardData = useCallback(async () => {
		try {
			setErrorMessage(null);
			const data = await fetchDashboardDataApi();
			setDashboardData(data);
		} catch {
			setErrorMessage('Failed to load dashboard data. Please refresh.');
		}
	}, []);

	useEffect(() => {
		void fetchDashboardData();
	}, [fetchDashboardData]);
	return (
		<DashboardLayout activeMenu="Dashboard">
			{errorMessage ? (
				<div className="my-10 mx-auto max-w-md p-4 bg-white rounded shadow">
					<p className="text-red-500 text-sm">{errorMessage}</p>
					<button
						type="button"
						className="mt-4 px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-400"
						onClick={() => void fetchDashboardData()}
					>
						Retry
					</button>
				</div>
			) : dashboardData ? (
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
							transactions={dashboardData.recentTransactions}
						/>

						<FinancialOverview
							totalBalance={dashboardData?.totalBalance || 0}
							totalExpenses={dashboardData.totalExpenses || 0}
							totalIncome={dashboardData.totalIncome || 0}
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<ExpenseTransaction
							transactions={dashboardData?.last30DaysExpenses}
						/>
						<Last30DaysExpenses
							data={dashboardData?.last30DaysExpenses?.transaction || []}
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Last60DaysIncome
							data={
								dashboardData.last60DaysIncome.transaction.slice(0, 4) || []
							}
							totalIncome={dashboardData.totalIncome || 0}
						/>
						<IncomeTransactions transactions={dashboardData.last60DaysIncome} />
					</div>
				</div>
			) : (
				<LoadingState></LoadingState>
			)}
		</DashboardLayout>
	);
};

export default Home;
