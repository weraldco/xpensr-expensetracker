import HeadExpenseItem from '@/components/HeadExpenseItem';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LoadingState from '@/components/LoadingState';
import TransactionItem from '@/components/TransactionItem';
import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import { formatAmount } from '@/utils/helper';
import { useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { IoWalletOutline } from 'react-icons/io5';
import { LuWalletCards } from 'react-icons/lu';
import { PiHandCoins } from 'react-icons/pi';

const Home = () => {
	const [dashboardData, setDashboardData] = useState(null);
	const [loading, setLoading] = useState(false);

	const fetchDashboardData = async () => {
		if (loading) return;

		setLoading(true);
		try {
			const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);

			setDashboardData(response.data);
		} catch (error) {
			console.error('Failed to fetch dashboard data', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDashboardData();
	}, []);
	console.log(dashboardData);

	return (
		<DashboardLayout activeMenu="Dashboard">
			{dashboardData ? (
				<div className="flex flex-col gap-4">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
						<HeadExpenseItem
							icon={<IoWalletOutline size={20} />}
							title="Total Balance"
							amount={
								dashboardData && dashboardData?.totalBalance
									? formatAmount(dashboardData?.totalBalance)
									: '$ 0.00'
							}
							className="bg-violet-500"
						/>
						<HeadExpenseItem
							icon={<PiHandCoins size={20} />}
							title="Total Income"
							amount={
								dashboardData && dashboardData?.totalIncome
									? formatAmount(dashboardData?.totalIncome)
									: '$ 0.00'
							}
							className="bg-orange-400"
						/>
						<HeadExpenseItem
							icon={<LuWalletCards size={20} />}
							title="Total Expenses"
							amount={
								dashboardData && dashboardData?.totalExpenses
									? formatAmount(dashboardData?.totalExpenses)
									: '$ 0.00'
							}
							className="bg-red-400"
						/>
					</div>
					<div className="p-4 bg-white rounded-md flex flex-col gap-4 shadow-md shadow-gray-100">
						<div className="flex justify-between items-center">
							<h1 className="text-md  poppins-semibold">Recent Transactions</h1>
							<div className="text-xs px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 duration-200 cursor-pointer active:bg-gray-300 flex gap-2">
								<span>See All</span> <BsArrowRight size={15} />
							</div>
						</div>
						<div className="flex flex-col ">
							{dashboardData?.recentTransactions?.map((data, i) => (
								<TransactionItem data={data} key={i} />
							))}
						</div>
					</div>
				</div>
			) : (
				<LoadingState></LoadingState>
			)}
		</DashboardLayout>
	);
};

export default Home;
