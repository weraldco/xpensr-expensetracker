/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FaRegEye } from 'react-icons/fa6';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserContext } from '@/context/userContext';
import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import ProfilePhotoSelector from './ProfilePhotoSelector';

export interface ImageT {
	name: string;
	size: number;
	type: string;
	webkitRelativePath: string;
	lastModifiedDate: Date;
	lastModified: number;
}

const imageSchema = z.object({
	name: z.string(),
	size: z.number(),
	type: z.string(),
	webkitRelativePath: z.string(),
	lastModifiedDate: z.date(),
	lastModified: z.number(),
});
const formSchema = z.object({
	fullName: z.string().min(10),
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(4),
	repeatPassword: z.string().min(4),
	profileImageUrl: imageSchema.optional(),
});
const RegistrationForm = () => {
	const [error, setError] = useState<string>('');

	const { updateUser } = useContext(UserContext);
	const navigate = useNavigate();
	const handleImageChange = (data: ImageT | null) => {
		if (data !== null) {
			form.setValue('profileImageUrl', {
				name: data.name,
				size: data.size,
				type: data.type,
				webkitRelativePath: data.webkitRelativePath,
				lastModifiedDate: data.lastModifiedDate,
				lastModified: data.lastModified,
			});
		} else {
			form.setValue('profileImageUrl', undefined);
		}
	};
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
			repeatPassword: '',
			profileImageUrl: undefined,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setError('');
		try {
			const { fullName, email, password, repeatPassword, profileImageUrl } =
				values;

			const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
				fullName,
				email,
				password,
				profileImageUrl,
			});

			const { token, user } = response.data;

			if (token) {
				localStorage.setItem('token', token);
				updateUser(user);
				navigate('/dashboard');
			}
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				setError(error.response.data.message);
			} else {
				setError('Something went wrong. Please try again!');
			}
		}
	};
	return (
		<div className="flex flex-col items-center  h-screen w-full gap-10">
			<div className="flex flex-col gap-4 inter-regular py-4">
				<div className="flex flex-col">
					<div className="inter-medium text-xl">Create an Account</div>
					<div className="text-xs text-gray-500">
						Join us today by entering your details below.
					</div>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6 w-[400px]"
					>
						<ProfilePhotoSelector imageData={handleImageChange} />
						<FormField
							control={form.control}
							name="fullName"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-gray-700">Fullname</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter your Fullname.."
											className="py-5"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-gray-700">Email Address</FormLabel>
									<FormControl>
										<Input
											placeholder="example@email.com"
											className="py-5"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem className="relative">
									<FormLabel className="text-gray-700">Password</FormLabel>
									<FormControl>
										<Input
											placeholder="Your password.."
											className="py-5"
											type="password"
											{...field}
										/>
									</FormControl>
									<button
										type="button"
										className="absolute bottom-3 right-2 cursor-pointer"
									>
										<FaRegEye className=" text-gray-700" size={18} />
									</button>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="repeatPassword"
							render={({ field }) => (
								<FormItem className="relative">
									<FormLabel className="text-gray-600">
										Repeat Password
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Your repeat password.."
											className="py-5"
											type="password"
											{...field}
										/>
									</FormControl>
									<button
										type="button"
										className="absolute bottom-3 right-2 cursor-pointer"
									>
										<FaRegEye className=" text-gray-700" size={18} />
									</button>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className="cursor-pointer w-full bg-violet-500 hover:bg-violet-400 duration-200 active:bg-violet-600 py-6">
							REGISTER
						</Button>
					</form>
				</Form>
				<div className="text-gray-400 text-sm">
					Already registered?{' '}
					<Link to="/login" className="hover:underline text-violet-400">
						Sign-in here
					</Link>
				</div>
			</div>
		</div>
	);
};

export default RegistrationForm;
