/* eslint-disable react-hooks/exhaustive-deps */
import { UserContext } from '@/context/userContext';
import { getUserInfo } from '@/services/authService';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';

export const useUserAuth = () => {
	const { user, updateUser, clearUser } = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) return;

		let isMounted = true;

		const fetchUserInfo = async () => {
			try {
				const userInfo = await getUserInfo();

				if (isMounted && userInfo) {
					updateUser(userInfo);
				}
			} catch (error) {
				console.error('Failed to fetch user info', error);
				if (isMounted) {
					clearUser();
					navigate('/login');
				}
			}
		};

		fetchUserInfo();

		return () => {
			isMounted = false;
		};
	}, [updateUser, clearUser, navigate]);
};
