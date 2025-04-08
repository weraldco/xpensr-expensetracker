import IncomeTransactions from '@/components/Dashboard/IncomeTransactions';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LoadingState from '@/components/LoadingState';
import { UserContext } from '@/context/userContext';
import { useContext } from 'react';

const Income = () => {
	// const { dashboardData } = useContext(UserContext);
	return (
		<DashboardLayout activeMenu="Income">
			{/* {dashboardData ? (
				<IncomeTransactions transactions={dashboardData.last60DaysIncome} />
			) : (
				<LoadingState />
			)} */}
			<></>
		</DashboardLayout>
	);
};

export default Income;
