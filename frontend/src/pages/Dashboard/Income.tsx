/* eslint-disable react-hooks/exhaustive-deps */
import DataOverviews from '@/components/DataOverviews';
import DataSources from '@/components/DataSources';
import DeleteAlert from '@/components/DeleteAlert';
import AddIncomeForm from '@/components/Income/AddIncomeForm';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LoadingState from '@/components/LoadingState';
import Modal from '@/components/Modal';
import { UserContext } from '@/context/userContext';
import { getAllIncome } from '@/services/transactionService';
import { API_PATHS } from '@/utils/apiPaths';
import { TransactionT } from '@/utils/types';
import { useContext, useEffect, useState } from 'react';

const Income = () => {
	const {
		handleAdd,
		openAddModal,
		setOpenAddModal,
		openDeleteAlert,
		setOpenDeleteAlert,
		handleDelete,
		downloadDataSummary,
	} = useContext(UserContext);

	const [incomeData, setIncomeData] = useState<TransactionT[] | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	// Get All Income Data
	const fetchIncomeData = async () => {
		if (loading) return;

		setLoading(true);
		setIncomeData(null);
		setErrorMessage(null);
		try {
			const data = await getAllIncome();
			setIncomeData(data);
		} catch (error) {
			setErrorMessage('Failed to load income. Please refresh.');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchIncomeData();

		return () => {};
	}, []);
	return (
		<DashboardLayout activeMenu="Income">
			{errorMessage ? (
				<div className="my-10 mx-auto max-w-md p-4 bg-white rounded shadow">
					<p className="text-red-500 text-sm">{errorMessage}</p>
					<button
						type="button"
						className="mt-4 px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-400"
						onClick={() => void fetchIncomeData()}
					>
						Retry
					</button>
				</div>
			) : loading || incomeData === null ? (
				<LoadingState></LoadingState>
			) : (
				<div className="my-5 mx-auto">
					<div className="flex flex-col gap-4">
						<DataOverviews
							chartType="barchart"
							subtitle="
						Track your earnings over time and analyze your income trends."
							title="Income Overviews"
							transactions={incomeData}
							onAdd={() => setOpenAddModal(true)}
							btnLabel="Add Income"
						/>
						<DataSources
							title="Income Sources"
							subHeading="Show all your source of income - where the income come from and the amount"
							transactions={incomeData}
							onDelete={(id) => {
								setOpenDeleteAlert({ show: true, data: id });
							}}
							optType="income"
							onDownload={() =>
								downloadDataSummary(
									API_PATHS.INCOME.DOWNLOAD_INCOME,
									'income_full_data'
								)
							}
						/>
					</div>
					<Modal
						isOpen={openAddModal}
						onClose={() => setOpenAddModal(false)}
						title="Add Income"
					>
						<AddIncomeForm
							onAddIncome={(values) => {
								handleAdd(values, fetchIncomeData, API_PATHS.INCOME.ADD_INCOME);
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
									fetchIncomeData,
									API_PATHS.INCOME.DELETE_INCOME(openDeleteAlert.data)
								)
							}
						/>
					</Modal>
				</div>
			)}
		</DashboardLayout>
	);
};

export default Income;
