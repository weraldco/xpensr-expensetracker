import { FC, ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

const AuthLayout: FC<Props> = ({ children }) => {
	return (
		<div>
			<div className="bg-gray flex flex-col gap-2 py-1 ">
				<h1 className="cherry-bomb-one-regular text-4xl text-violet-500">
					xpensee
				</h1>
				<span className="text-gray-400 text-xs">
					Track your Expense and Income
				</span>
			</div>
			<div>{children}</div>
		</div>
	);
};

export default AuthLayout;
