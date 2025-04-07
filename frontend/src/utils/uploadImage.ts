/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_PATHS } from './apiPaths';
import axiosInstance from './axiosInstance';

const uploadImage = async (imageFile: string) => {
	const formData = new FormData();
	// Append image file to form data
	formData.append('image', imageFile);

	try {
		const response = await axiosInstance.post(
			API_PATHS.IMAGE.UPLOAD_IMAGE,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		);
		return response.data;
	} catch (error: any) {
		console.error(`Error uploading the image:`, error);
		throw error;
	}
};

export default uploadImage;
