import ExpenseTransaction from '@/components/Dashboard/ExpenseTransaction';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LoadingState from '@/components/LoadingState';
import { UserContext } from '@/context/userContext';
import { useContext } from 'react';

const Expenses = () => {
	// const { dashboardData } = useContext(UserContext);
	return (
		<DashboardLayout activeMenu="Expenses">
			{/* {dashboardData ? (
				<ExpenseTransaction transactions={dashboardData.last30DaysExpenses} />
			) : (
				<LoadingState />
			)} */}
			<></>
		</DashboardLayout>
	);
};

export default Expenses;
