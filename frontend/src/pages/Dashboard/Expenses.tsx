/* eslint-disable react-hooks/exhaustive-deps */
import DataOverviews from '@/components/DataOverviews';
import DataSources from '@/components/DataSources';
import DeleteAlert from '@/components/DeleteAlert';
import AddExpenseForm from '@/components/Expense/AddExpenseForm';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LoadingState from '@/components/LoadingState';
import Modal from '@/components/Modal';
import { UserContext } from '@/context/userContext';
import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import { TransactionT } from '@/utils/types';
import { useContext, useEffect, useState } from 'react';

const Expenses = () => {
	const {
		handleAdd,
		openAddModal,
		setOpenAddModal,
		openDeleteAlert,
		setOpenDeleteAlert,
		handleDelete,
		downloadDataSummary,
	} = useContext(UserContext);

	const [expenseData, setExpenseData] = useState<TransactionT[] | []>([]);
	const [loading, setLoading] = useState(false);
	const fetchExpenseData = async () => {
		if (loading) return;

		setLoading(true);
		try {
			const response = await axiosInstance.get(
				API_PATHS.EXPENSE.GET_ALL_EXPENSE
			);

			if (response.data) {
				setExpenseData(response.data.expense);
			}
		} catch (error) {
			console.log('Error fetching data', error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchExpenseData();

		return () => {};
	}, []);
	return (
		<DashboardLayout activeMenu="Expenses">
			{expenseData ? (
				<div className="my-5 mx-auto">
					<div className="flex flex-col gap-4">
						<DataOverviews
							chartType="linechart"
							subtitle="Track your expenses over time and analyze your expense trend by chart."
							title="Expenses Overview"
							transactions={expenseData}
							onAdd={() => setOpenAddModal(true)}
							btnLabel="Add Expenses"
						/>
						<DataSources
							title="Expenses"
							subHeading="Show all your expenses, the date and where you spend your money."
							transactions={expenseData}
							optType="expense"
							onDelete={(id) => {
								setOpenDeleteAlert({ show: true, data: id });
							}}
							onDownload={() =>
								downloadDataSummary(
									API_PATHS.INCOME.DOWNLOAD_INCOME,
									'expense_full_data'
								)
							}
						/>
					</div>
					<Modal
						isOpen={openAddModal}
						onClose={() => setOpenAddModal(false)}
						title="Add Expenses"
					>
						<AddExpenseForm
							onAdd={(values) => {
								handleAdd(
									values,
									fetchExpenseData,
									API_PATHS.EXPENSE.ADD_EXPENSE
								);
							}}
						/>
					</Modal>
					<Modal
						isOpen={openDeleteAlert.show}
						onClose={() => setOpenDeleteAlert({ show: false, data: '' })}
						title="Deleting Income"
					>
						<DeleteAlert
							content="Are you sure you want to delete this expense item?"
							onDelete={() =>
								handleDelete(
									fetchExpenseData,
									API_PATHS.EXPENSE.DELETE_EXPENSE(openDeleteAlert.data)
								)
							}
						/>
					</Modal>
				</div>
			) : (
				<LoadingState></LoadingState>
			)}
		</DashboardLayout>
	);
};

export default Expenses;
