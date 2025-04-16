const API_ROOT = '/api/v1';
//  utils/apiPaths.js
export const API_PATHS = {
	AUTH: {
		LOGIN: `${API_ROOT}/auth/login`,
		REGISTER: `${API_ROOT}/auth/register`,
		GET_USER_INFO: `${API_ROOT}/auth/getUser`,
	},
	DASHBOARD: {
		GET_DATA: `${API_ROOT}/dashboard`,
	},
	INCOME: {
		ADD_INCOME: `${API_ROOT}/income/add`,
		GET_ALL_INCOME: `${API_ROOT}/income/get`,
		DELETE_INCOME: (incomeId: string) => `${API_ROOT}/income/${incomeId}`,
		DOWNLOAD_INCOME: `${API_ROOT}/income/downloadexcel`,
	},
	EXPENSE: {
		ADD_EXPENSE: `${API_ROOT}/expense/add`,
		GET_ALL_EXPENSE: `${API_ROOT}/expense/get`,
		DELETE_EXPENSE: (expenseId: string) => `${API_ROOT}/expense/${expenseId}`,
		DOWNLOAD_EXPENSE: `${API_ROOT}/expense/downloadexcel`,
	},

	IMAGE: {
		UPLOAD_IMAGE: `${API_ROOT}/auth/upload-image`,
	},
};
