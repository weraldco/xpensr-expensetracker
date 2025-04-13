import axiosInstance from '@/utils/axiosInstance';
import { UserContextType, UserType, ValuesT } from '@/utils/types';
import { createContext, FC, ReactNode, useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
	children: ReactNode;
}

const defaultValue: UserContextType = {
	user: null,
	updateUser: () => null,
	clearUser: () => null,
	handleAdd: async () => {},
	handleDelete: async () => {},
	openAddModal: false,
	setOpenAddModal: () => {},
	openDeleteAlert: { show: false, data: '' },
	setOpenDeleteAlert: () => {},
};

export const UserContext = createContext<UserContextType>(defaultValue);

const UserProvider: FC<Props> = ({ children }) => {
	const [user, setUser] = useState<UserType | null>(null);
	const [openAddModal, setOpenAddModal] = useState<boolean>(false);
	const [openDeleteAlert, setOpenDeleteAlert] = useState<{
		show: boolean;
		data: string | '';
	}>({ show: false, data: '' });

	// Function to updatge user data
	const updateUser = (userData: UserType | null) => {
		setUser(userData);
	};

	// Function to clear user data (e.g, on logout)
	const clearUser = () => {
		setUser(null);
	};
	// const fetchDataByPath = async (
	// 	path: string
	// ): Promise<TransactionT[] | null> => {
	// 	try {
	// 		const response = await axiosInstance.get(path);
	// 		// API_PATHS.INCOME.GET_ALL_INCOME
	// 		const data: TransactionT[] = await response.data;
	// 		return data;
	// 	} catch (error) {
	// 		console.log('Error fetching data', error);
	// 		return null;
	// 	}
	// };
	const handleAdd = async (
		values: ValuesT,
		fetchData: () => Promise<void>,
		path: string
	) => {
		try {
			await axiosInstance.post(path, values);
			setOpenAddModal(false);
			toast.success('Successfull Added New Income');
			fetchData();
		} catch (error) {
			console.error('Something went wrong! Try again!', error);
		}
	};

	const handleDelete = async (fetchData: () => Promise<void>, path: string) => {
		try {
			await axiosInstance.delete(path);
			setOpenDeleteAlert({ show: false, data: '' });
			toast.success('Successfully Delete Income!');
			fetchData();
		} catch (error) {
			console.error('Something went wrong, try again!', error);
		}
	};
	const value = {
		user,
		updateUser,
		clearUser,
		handleAdd,
		handleDelete,
		openAddModal,
		setOpenAddModal,
		openDeleteAlert,
		setOpenDeleteAlert,
	};
	return (
		<div>
			<UserContext.Provider value={value}>{children}</UserContext.Provider>
		</div>
	);
};

export default UserProvider;
