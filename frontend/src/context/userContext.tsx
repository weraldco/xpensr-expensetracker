import { createContext, FC, ReactNode, useState } from 'react';

interface Props {
	children: ReactNode;
}

export const UserContext = createContext();

const UserProvider: FC<Props> = ({ children }) => {
	const [user, setUser] = useState(null);

	// Function to updatge user data
	const updateUser = (userData) => {
		setUser(userData);
	};

	// Function to clear user data (e.g, on logout)
	const clearUser = () => {
		setUser(null);
	};
	return (
		<div>
			<UserContext.Provider value={{ user, updateUser, clearUser }}>
				{children}
			</UserContext.Provider>
		</div>
	);
};

export default UserProvider;
