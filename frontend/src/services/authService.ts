import axiosInstance from '@/utils/axiosInstance';
import { API_PATHS } from '@/utils/apiPaths';
import type { UserType } from '@/utils/types';

export type RegisterPayload = {
	fullName: string;
	email: string;
	password: string;
	profileImageUrl: string;
};

export type RegisterResponse = {
	token: string;
	user: UserType;
};

export const register = async (
	payload: RegisterPayload
): Promise<RegisterResponse> => {
	const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, payload);
	return response.data;
};

export type LoginPayload = {
	email: string;
	password: string;
};

export const login = async (
	payload: LoginPayload
): Promise<RegisterResponse> => {
	const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, payload);
	return response.data;
};

export const getUserInfo = async (): Promise<UserType> => {
	const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
	return response.data;
};

