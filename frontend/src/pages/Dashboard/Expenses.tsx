import DataOverviews from '@/components/DataOverviews';
import DataSources from '@/components/DataSources';
import DeleteAlert from '@/components/DeleteAlert';
import AddExpenseForm from '@/components/Expense/AddExpenseForm';
import DashboardLayout from '@/components/layout/DashboardLayout';
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

	const handleDownloadExpensesDetails = () => {};
	useEffect(() => {
		fetchExpenseData();

		return () => {};
	}, []);
	console.log('ex', expenseData);
	return (
		<DashboardLayout activeMenu="Expenses">
			<div className="my-5 mx-auto">
				<div className="flex flex-col gap-4">
					<DataOverviews
						chartType="linechart"
						subtitle="Track your expenses over time and analyze your expense trend."
						title="Expenses Overviews"
						transactions={expenseData}
						onAdd={() => setOpenAddModal(true)}
						btnLabel="Add Expenses"
					/>
					<DataSources
						title="Expense Sources"
						transactions={expenseData}
						onDelete={(id) => {
							setOpenDeleteAlert({ show: true, data: id });
						}}
						onDownload={handleDownloadExpensesDetails}
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
						content="Are you sure you want to delete this income?"
						onDelete={() =>
							handleDelete(
								fetchExpenseData,
								API_PATHS.EXPENSE.DELETE_EXPENSE(openDeleteAlert.data)
							)
						}
					/>
				</Modal>
			</div>
		</DashboardLayout>
	);
};

export default Expenses;
