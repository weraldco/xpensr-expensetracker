import { FC, useState } from 'react';
import { IoIosMenu, IoMdClose } from 'react-icons/io';
import Sidebar from './Sidebar';

interface Props {
	activeMenu: string;
}

const Navbar: FC<Props> = ({ activeMenu }) => {
	const [openSideMenu, setOpenSideMenu] = useState(false);
	return (
		<div className="flex gap-4  border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sticky top-0 z-50 bg-white">
			<button
				className="block lg:hidden text-black "
				onClick={() => setOpenSideMenu(!openSideMenu)}
			>
				{openSideMenu ? <IoMdClose size={24} /> : <IoIosMenu size={24} />}
			</button>
			<div className="sticky top-0  bg-gray flex flex-col gap-2 py-1 ">
				<h1 className="cherry-bomb-one-regular text-5xl text-violet-500">
					xpensr
				</h1>
				<span className="text-gray-400 text-xs">
					Track your Expense and Income
				</span>
			</div>
			{openSideMenu && (
				<div className="fixed top-[105px] -ml-4 bottom-0 z-10 text-white">
					<Sidebar activeMenu={activeMenu} />
				</div>
			)}
		</div>
	);
};

export default Navbar;
