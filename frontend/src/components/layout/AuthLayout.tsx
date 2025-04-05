import { FC, ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

const AuthLayout: FC<Props> = ({ children }) => {
	return <div>{children}</div>;
};

export default AuthLayout;
