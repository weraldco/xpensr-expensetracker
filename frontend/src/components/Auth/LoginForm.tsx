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

import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';

const formSchema = z.object({
	email: z.string().email({ message: 'Invalid email address.' }),
	password: z.string().min(4),
});
const LoginForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};
	return (
		<div className="flex flex-col items-center justify-center h-screen w-screen gap-10">
			<div className="text-center flex flex-col gap-2">
				<h1 className="cherry-bomb-one-regular text-7xl text-violet-500">
					xpensee
				</h1>
				<span className="text-gray-400 text-base">
					Track your Expense and Income
				</span>
			</div>

			<div className="flex flex-col gap-4 inter-regular py-10">
				<div className="flex flex-col">
					<div className="inter-medium text-xl">Welcome back</div>
					<div className="text-xs text-gray-400">
						Please enter your details to enter.
					</div>
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
					<span className="hover:underline text-violet-400">Sign-up here</span>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
