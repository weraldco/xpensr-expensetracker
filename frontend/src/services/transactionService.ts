import axiosInstance from '@/utils/axiosInstance';
import { API_PATHS } from '@/utils/apiPaths';
import type { TransactionT, ValuesT } from '@/utils/types';

export const getAllIncome = async (): Promise<TransactionT[]> => {
	const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
	return response.data.income;
};

export const getAllExpenses = async (): Promise<TransactionT[]> => {
	const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
	return response.data.expense;
};

export const createTransaction = async (
	path: string,
	values: ValuesT
): Promise<void> => {
	await axiosInstance.post(path, values);
};

export const deleteTransaction = async (path: string): Promise<void> => {
	await axiosInstance.delete(path);
};

export const downloadExcel = async (
	path: string,
	fileName: string
): Promise<void> => {
	const response = await axiosInstance.get(path, { responseType: 'blob' });

	const url = window.URL.createObjectURL(new Blob([response.data]));
	const link = document.createElement('a');
	link.href = url;
	link.setAttribute('download', `${fileName}.xlsx`);
	document.body.appendChild(link);
	link.click();
	link.parentNode?.removeChild(link);
	window.URL.revokeObjectURL(url);
};

