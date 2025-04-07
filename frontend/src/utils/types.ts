export type UserContextType = {
	user: UserType | null;
	updateUser: (data: UserType | null) => void;
	clearUser: () => void;
	loading: boolean;
	dashboardData: DashboardDataT | null;
};

export type UserType = {
	fullName: string;
	email: string;
	password: string;
	profileImageUrl: string;
};

export type TransactionT = {
	id: string;
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
