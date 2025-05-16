/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FC, useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

interface Props {
	name: string;
	formControl: any;
	label: string;
	placeholder: string;
	type: string;
	showEyeBtn?: boolean;
}

const AuthInput: FC<Props> = ({
	name,
	formControl,
	label,
	placeholder,
	type,
	showEyeBtn,
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const [inputType, setInputType] = useState('');
	useEffect(() => {
		setInputType(type);
	}, []);
	const handleShowPassword = () => {
		setShowPassword(!showPassword);

		const inputPassword = document.getElementById(name);

		const type = inputPassword?.getAttribute('type');
		if (type == 'text') {
			setInputType('password');
		} else {
			setInputType('text');
		}
	};
	return (
		<FormField
			control={formControl}
			name={name}
			render={({ field }) => (
				<FormItem className="relative">
					<FormLabel className="text-gray-700">{label}</FormLabel>
					<FormControl>
						<Input
							id={name}
							placeholder={placeholder}
							className="py-5"
							type={inputType}
							{...field}
						/>
					</FormControl>
					{showEyeBtn && (
						<button
							type="button"
							className="absolute bottom-3 right-2 cursor-pointer"
							onClick={handleShowPassword}
						>
							{showPassword ? (
								<FaRegEye
									className=" text-gray-400 hover:text-gray-300 active:text-gray-400"
									size={18}
								/>
							) : (
								<FaRegEyeSlash
									className=" text-gray-400 hover:text-gray-300 active:text-gray-400"
									size={18}
								/>
							)}
						</button>
					)}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default AuthInput;
