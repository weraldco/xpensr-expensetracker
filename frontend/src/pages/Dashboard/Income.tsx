import DataOverviews from '@/components/DataOverviews';
import DataSources from '@/components/DataSources';
import DeleteAlert from '@/components/DeleteAlert';
import AddIncomeForm from '@/components/Income/AddIncomeForm';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Modal from '@/components/Modal';
import { UserContext } from '@/context/userContext';
import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
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
	} = useContext(UserContext);

	const [incomeData, setIncomeData] = useState<TransactionT[] | []>([]);
	const [loading, setLoading] = useState(false);

	// Get All Income Data
	const fetchIncomeData = async () => {
		if (loading) return;

		setLoading(true);
		try {
			const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);

			if (response.data) {
				setIncomeData(response.data.income);
			}
		} catch (error) {
			console.log('Error fetching data', error);
		} finally {
			setLoading(false);
		}
	};

	const handleDownloadIncomeDetails = () => {};
	useEffect(() => {
		fetchIncomeData();

		return () => {};
	}, []);
	return (
		<DashboardLayout activeMenu="Income">
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
						transactions={incomeData}
						onDelete={(id) => {
							setOpenDeleteAlert({ show: true, data: id });
						}}
						onDownload={handleDownloadIncomeDetails}
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
		</DashboardLayout>
	);
};

export default Income;
