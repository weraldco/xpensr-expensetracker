import { UserContext } from '@/context/userContext';
import { useUserAuth } from '@/hooks/useUserAuth';
import { FC, ReactNode, useContext } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Navbar/Sidebar';

interface Props {
	children: ReactNode;
	activeMenu: string;
}

const DashboardLayout: FC<Props> = ({ children, activeMenu }) => {
	useUserAuth();
	const { user } = useContext(UserContext);

	return (
		<div className="">
			<Navbar activeMenu={activeMenu} />
			{user && (
				<div className="flex relative ">
					<Sidebar activeMenu={activeMenu} className="max-[1080px]:hidden" />

					<div className="grow mx-5">{children}</div>
				</div>
			)}
		</div>
	);
};

export default DashboardLayout;
