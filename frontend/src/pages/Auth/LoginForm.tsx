/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserContext } from '@/context/userContext';
import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';

const formSchema = z.object({
	email: z.string().email({ message: 'Invalid email address.' }),
	password: z.string().min(4),
});
const LoginForm = () => {
	const navigate = useNavigate();
	const [error, setError] = useState<string>('');

	// Context variable use
	const { updateUser } = useContext(UserContext);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setError('');
		const { email, password } = values;
		try {
			const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
				email,
				password,
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
		<div className="flex flex-col items-center  h-screen w-full gap-10 ">
			<div className="flex flex-col gap-6 inter-regular py-10">
				<div className="bg-gray flex flex-col gap-3 py-1 items-center">
					<h1 className="cherry-bomb-one-regular text-7xl text-violet-500">
						xpensr
					</h1>
					<span className="text-gray-400 text-base">
						Track your Expense and Income
					</span>
				</div>
				<div className="flex flex-col">
					<div className="inter-medium text-xl">Welcome back</div>
					<div className="text-xs text-gray-400">
						Please enter your details to enter.
					</div>
					{error && <div className="text-red-400 text-sm">{error}</div>}
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6 w-[400px]"
					>
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
								<FormItem>
									<FormLabel className="text-gray-700">Password</FormLabel>
									<FormControl>
										<Input
											placeholder="Your password.."
											className="py-5"
											type="password"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className="cursor-pointer w-full bg-violet-500 hover:bg-violet-400 duration-200 active:bg-violet-600 py-6">
							LOGIN
						</Button>
					</form>
				</Form>
				<div className="text-gray-400 text-sm">
					Don't have account?{' '}
					<Link to="/registration" className="hover:underline text-violet-400">
						Sign-up here
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
