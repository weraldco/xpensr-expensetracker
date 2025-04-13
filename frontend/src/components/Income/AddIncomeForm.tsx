import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ValuesT } from '@/utils/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuCalendar } from 'react-icons/lu';
import { z } from 'zod';
import EmojiPickerPopup from '../EmojiPickerPopup';

const formSchema = z.object({
	source: z.string().min(2).max(50),
	amount: z.string(),
	date: z.date({ required_error: 'Date is required' }),
	icon: z.string(),
});

interface Props {
	onAddIncome: (values: ValuesT) => void;
}

const AddIncomeForm: FC<Props> = ({ onAddIncome }) => {
	const [icon, setIcon] = useState<string | ''>('');

	const handleChangeIcon = (icon: string) => {
		setIcon(icon);
		form.setValue('icon', icon);
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			source: '',
			amount: '',
			date: new Date(Date.now()),
			icon: '',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		onAddIncome(values);
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<EmojiPickerPopup
					icon={icon}
					onSelect={(icon) => handleChangeIcon(icon)}
				/>
				<FormField
					control={form.control}
					name="source"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Source of Income</FormLabel>
							<FormControl>
								<Input
									placeholder="eg. Sideline, Income, Investment"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="date"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Date of Income</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={'outline'}
											className={cn(
												' pl-3 text-left font-normal w-full',
												!field.value && 'text-muted-foreground'
											)}
										>
											{field.value ? (
												format(field.value, 'PPP')
											) : (
												<span>Pick a date</span>
											)}
											<LuCalendar className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) =>
											date > new Date() || date < new Date('1900-01-01')
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="amount"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Amount</FormLabel>
							<FormControl>
								<Input placeholder="eg. 10000" {...field} type="number" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full">
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default AddIncomeForm;
