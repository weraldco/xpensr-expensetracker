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
import uploadImage from '@/utils/uploadImage';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import AuthInput from './AuthInput';
import ProfilePhotoSelector from './ProfilePhotoSelector';

export interface ImageT {
	name: string;
	size: number;
	type: string;
	webkitRelativePath: string;
	lastModifiedDate: Date;
	lastModified: number;
}

const formSchema = z.object({
	fullName: z.string().min(10),
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(4),
	repeatPassword: z.string().min(4),
	profileImageUrl: z.string(),
});
const RegistrationForm = () => {
	const [profilePic, setProfilePic] = useState(null);
	const [error, setError] = useState<string>('');

	const { updateUser } = useContext(UserContext);

	const navigate = useNavigate();
	const profileImageUrl = '';
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
			repeatPassword: '',
			profileImageUrl: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		// setError('');
		// try {
		// 	if (profilePic) {
		// 		const imgUploadResponse = await uploadImage(profilePic);
		// 		profileImageUrl = imgUploadResponse.imageUrl || '';
		// 	}
		// 	const { fullName, email, password, repeatPassword } = values;
		// 	if (password !== repeatPassword) {
		// 		setError("Password didn't match!");
		// 		return;
		// 	}
		// 	const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
		// 		fullName,
		// 		email,
		// 		password,
		// 		profileImageUrl,
		// 	});
		// 	toast.success(`Congratulation, you've successfully registered.`);
		// 	const { token, user } = response.data;

		// 	if (token) {
		// 		localStorage.setItem('token', token);
		// 		updateUser(user);
		// 		navigate('/dashboard');
		// 	}
		// } catch (error: any) {
		// 	if (error.response && error.response.data.message) {
		// 		setError(error.response.data.message);
		// 	} else {
		// 		setError('Something went wrong. Please try again!');
		// 	}
		// }
		console.log(values);
	};

	return (
		<div className="flex flex-col items-center  h-screen w-full gap-10">
			<div className="flex flex-col gap-4 inter-regular py-4">
				<div className="flex flex-col">
					<div className="inter-medium text-xl">Create an Account</div>
					<div className="text-xs text-gray-500">
						Join us today by entering your details below.
					</div>
					{error && <div className="text-red-400 text-sm">{error}</div>}
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6 w-[400px]"
					>
						<ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

						<AuthInput
							name="fullName"
							formControl={form.control}
							label="Fullname"
							placeholder="Enter your Fullname.."
							type="text"
						/>
						<AuthInput
							name="email"
							formControl={form.control}
							label="Email Address"
							placeholder="example@email.com"
							type="email"
						/>

						<AuthInput
							name="password"
							formControl={form.control}
							label="Password"
							placeholder="Enter your password..."
							type="password"
							showEyeBtn
						/>
						<AuthInput
							name="repeatPassword"
							formControl={form.control}
							label="Repeat Password"
							placeholder="Enter your repeat password..."
							type="password"
							showEyeBtn
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
