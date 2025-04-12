import AddIncomeForm from '@/components/Income/AddIncomeForm';
import IncomeOverview from '@/components/Income/IncomeOverview';
import IncomeSources from '@/components/Income/IncomeSources';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Modal from '@/components/Modal';
import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import { TransactionT, ValuesT } from '@/utils/types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Income = () => {
	const [incomeData, setIncomeData] = useState<TransactionT[] | []>([]);
	const [loading, setLoading] = useState(false);

	const [openDeleteAlert, setOpenDeleteAlert] = useState({
		show: false,
		data: null,
	});
	const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

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

	// Handle Add Income
	const handleAddIncome = async (values: ValuesT) => {
		try {
			await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, values);
			setOpenAddIncomeModal(false);
			// console.log('Success Added');
			toast.success('Successfull Added New Income');
			fetchIncomeData();
		} catch (error) {
			console.error('Something went wrong! Try again!', error);
		}
	};
	const deleteIncome = () => {
		console.log('hi');
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
					<IncomeOverview
						transactions={incomeData}
						onAddIncome={() => setOpenAddIncomeModal(true)}
					/>
					<IncomeSources
						transactions={incomeData}
						onDelete={deleteIncome}
						onDownload={handleDownloadIncomeDetails}
					/>
				</div>
				<Modal
					isOpen={openAddIncomeModal}
					onClose={() => setOpenAddIncomeModal(false)}
					title="Add Income"
				>
					<AddIncomeForm onAddIncome={handleAddIncome} />
				</Modal>
			</div>
		</DashboardLayout>
	);
};

export default Income;
