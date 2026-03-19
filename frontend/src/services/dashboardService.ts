import axiosInstance from '@/utils/axiosInstance';
import { API_PATHS } from '@/utils/apiPaths';
import type { DashboardDataT } from '@/utils/types';

export const getDashboardData = async (): Promise<DashboardDataT> => {
	const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
	return response.data;
};

