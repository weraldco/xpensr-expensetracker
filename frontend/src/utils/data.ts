import {
	LuHandCoins,
	LuLayoutDashboard,
	LuLogOut,
	LuWalletMinimal,
} from 'react-icons/lu';
export const SIDE_MENU_DATA = [
	{
		id: '01',
		label: 'Dashboard',
		icon: LuLayoutDashboard,
		path: '/dashboard',
	},
	{
		id: '02',
		label: 'Income',
		icon: LuWalletMinimal,
		path: '/income',
	},
	{
		id: '03',
		label: 'Expenses',
		icon: LuHandCoins,
		path: '/expenses',
	},
	{
		id: '04',
		label: 'Logout',
		icon: LuLogOut,
		path: '/logout',
	},
];
