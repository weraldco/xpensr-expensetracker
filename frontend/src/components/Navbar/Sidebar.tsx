import { ReactElement } from 'react';
import { BiWallet } from 'react-icons/bi';
import { MdLogout, MdOutlineDashboard } from 'react-icons/md';
import { PiHandCoins } from 'react-icons/pi';
import { Link } from 'react-router';

const Sidebar = () => {
	return (
		<div className="sticky bg-[#fefefe] top-0 bottom-0 left-0 border-r w-[200px] h-screen pt-24 z-40">
			{/* User info */}
			<div className=" flex flex-col justify-center items-center text-[0.95em] font-bold h-[150px]">
				<div className="w-[70px] h-[70px] bg-red-400 rounded-full ">
					<img
						src="/panda.png"
						className="w-full h-full object-cover rounded-full bg-amber-50"
						alt=""
					/>
				</div>
				<div>Panda Pandrino</div>
			</div>
			{/* Menu bar */}
			<div className="flex flex-col gap-2 p-4">
				<MenuItem
					className="active"
					icon={<MdOutlineDashboard size={20} />}
					label="Dashboard"
					redirectLink="/"
				/>
				<MenuItem
					icon={<BiWallet size={20} />}
					label="Income"
					redirectLink="/income"
				/>
				<MenuItem
					icon={<PiHandCoins size={20} />}
					label="Expenses"
					redirectLink="/expenses"
				/>
				<MenuItem
					icon={<MdLogout size={20} />}
					label="Logout"
					redirectLink="logout"
				/>
			</div>
		</div>
	);
};

export default Sidebar;

interface MenuItemProps {
	icon: ReactElement;
	label: string;
	className?: string;
	redirectLink: string;
}
const MenuItem = ({ icon, label, className, redirectLink }: MenuItemProps) => {
	return (
		<Link
			to={`${redirectLink}`}
			className={`flex gap-2 items-center duration-200 px-8 py-3 text-[0.9em] rounded-md
				${
					className
						? `${className}`
						: ` hover:bg-violet-500 hover:text-white duration-200`
				}
			`}
		>
			{icon}
			{label}
		</Link>
	);
};
