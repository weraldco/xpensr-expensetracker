import { UserContext } from '@/context/userContext';
import { SIDE_MENU_DATA } from '@/utils/data';
import { ReactNode, useContext } from 'react';
import { LuLogOut } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router';
import CharAvatar from '../Card/CharAvatar';

const Sidebar = ({
	activeMenu,
	className,
}: {
	activeMenu: string;
	className?: string;
}) => {
	const { user, clearUser } = useContext(UserContext);

	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.clear();
		if (user) {
			clearUser();
		}
		navigate('/login');
	};
	return (
		<div
			className={`top-[115px] bottom-0 left-0 border-r w-[200px] sticky h-[calc(100vh-115px)] z-30 bg-white ${className}`}
		>
			{/* User info */}
			<div className=" flex flex-col justify-center items-center text-[0.95em] font-bold h-[150px] gap-4 ">
				<div className="w-[70px] h-[70px]rounded-full ">
					{user && user?.profileImageUrl ? (
						<img
							src={user.profileImageUrl}
							className="w-full h-full object-cover rounded-full bg-amber-50"
							alt=""
						/>
					) : (
						<CharAvatar user={user?.fullName} />
					)}
				</div>
				<div className="text-black">{user?.fullName}</div>
			</div>
			{/* Menu bar */}
			<div className="flex flex-col gap-2 p-4 text-black">
				{SIDE_MENU_DATA.map((item, index) => (
					<MenuItem
						key={index}
						redirectLink={item.path}
						className={`${activeMenu === item.label ? 'active' : 'inactive'}`}
					>
						<item.icon className="" />
						{item.label}
					</MenuItem>
				))}
				<button
					onClick={handleLogout}
					className={`flex gap-2 items-center duration-200 px-8 py-3 text-[0.9em] rounded-md inactive cursor-pointer`}
				>
					<LuLogOut></LuLogOut>Logout
				</button>
			</div>
		</div>
	);
};

export default Sidebar;

interface MenuItemProps {
	children: ReactNode;
	className?: string;
	redirectLink: string;
}
const MenuItem = ({ children, className, redirectLink }: MenuItemProps) => {
	return (
		<Link
			to={`${redirectLink}`}
			className={`flex gap-2 items-center duration-200 px-8 py-3 text-[0.9em] rounded-md ${className}
			`}
		>
			{children}
		</Link>
	);
};
