/* eslint-disable react-hooks/exhaustive-deps */
import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import { DashboardDataT, UserContextType, UserType } from '@/utils/types';
import { createContext, FC, ReactNode, useEffect, useState } from 'react';

interface Props {
	children: ReactNode;
}

const defaultValue: UserContextType = {
	user: null,
	updateUser: () => null,
	clearUser: () => null,
	loading: false,
	dashboardData: null,
};

export const UserContext = createContext<UserContextType>(defaultValue);

const UserProvider: FC<Props> = ({ children }) => {
	const [user, setUser] = useState<UserType | null>(null);
	const [dashboardData, setDashboardData] = useState<DashboardDataT | null>(
		null
	);
	const [loading, setLoading] = useState(false);

	// Function to updatge user data
	const updateUser = (userData: UserType | null) => {
		setUser(userData);
	};

	// Function to clear user data (e.g, on logout)
	const clearUser = () => {
		setUser(null);
	};

	const getDashboardData = async () => {
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
		getDashboardData();
	}, []);

	const value = {
		user,
		updateUser,
		clearUser,
		dashboardData,
		loading,
	};
	return (
		<div>
			<UserContext.Provider value={value}>{children}</UserContext.Provider>
		</div>
	);
};

export default UserProvider;
