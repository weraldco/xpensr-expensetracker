/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react';

export type UserContextType = {
	user: UserType | null;
	updateUser: (data: UserType | null) => void;
	clearUser: () => void;
	handleAdd: (
		values: ValuesT,
		fetchData: () => Promise<void>,
		path: string
	) => Promise<void>;
	handleDelete: (fetchData: () => Promise<void>, path: string) => void;
	openAddModal: boolean;
	setOpenAddModal: Dispatch<SetStateAction<boolean>>;
	openDeleteAlert: { show: boolean; data: string | '' };
	setOpenDeleteAlert: Dispatch<
		SetStateAction<{ show: boolean; data: string | '' }>
	>;
	downloadDataSummary: (path: string, fileName: string) => void;
};

export type UserType = {
	fullName: string;
	email: string;
	password: string;
	profileImageUrl: string;
};

export type TransactionT = {
	id?: string;
	_id?: string;
	amount: number;
	category?: string;
	source?: string;
	icon: string;
	type: string;
	date: Date;
};

export type ExpenseT = {
	id: string;
	amount: number;
	category?: string;
	icon: string;
	type: string;
	date: Date;
};

export type IncomeT = {
	_id: string | undefined;
	map: any;
	id: string;
	amount: number;
	source?: string;
	icon: string;
	type: string;
	date: Date;
};

export type DashboardDataT = {
	totalBalance: number;
	totalExpenses: number;
	totalIncome: number;
	recentTransactions: TransactionT[];
	last30DaysExpenses: last30DaysExpensesT;
	last60DaysIncome: last60DaysIncomeT;
};

export type last30DaysExpensesT = {
	total: number;
	transaction: ExpenseT[];
};

export type last60DaysIncomeT = {
	total: number;
	transaction: IncomeT[];
};
export type ValuesT = {
	source?: string;
	category?: string;
	amount: string;
	date: Date;
	icon: string;
};
