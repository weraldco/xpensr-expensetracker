/* eslint-disable react-hooks/exhaustive-deps */
import DataOverviews from '@/components/DataOverviews';
import DataSources from '@/components/DataSources';
import DeleteAlert from '@/components/DeleteAlert';
import AddExpenseForm from '@/components/Expense/AddExpenseForm';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LoadingState from '@/components/LoadingState';
import Modal from '@/components/Modal';
import { UserContext } from '@/context/userContext';
import { getAllExpenses } from '@/services/transactionService';
import { API_PATHS } from '@/utils/apiPaths';
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

	const [expenseData, setExpenseData] = useState<TransactionT[] | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const fetchExpenseData = async () => {
		if (loading) return;

		setLoading(true);
		setExpenseData(null);
		setErrorMessage(null);
		try {
			const data = await getAllExpenses();
			setExpenseData(data);
		} catch (error) {
			setErrorMessage('Failed to load expenses. Please refresh.');
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
			{errorMessage ? (
				<div className="my-10 mx-auto max-w-md p-4 bg-white rounded shadow">
					<p className="text-red-500 text-sm">{errorMessage}</p>
					<button
						type="button"
						className="mt-4 px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-400"
						onClick={() => void fetchExpenseData()}
					>
						Retry
					</button>
				</div>
			) : loading || expenseData === null ? (
				<LoadingState></LoadingState>
			) : (
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
									API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
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
			)}
		</DashboardLayout>
	);
};

export default Expenses;
