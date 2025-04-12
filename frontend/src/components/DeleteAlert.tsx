import { FC } from 'react';

interface Props {
	content: string;
	onDelete: () => void;
}

const DeleteAlert: FC<Props> = ({ content, onDelete }) => {
	return (
		<div className="flex flex-col gap-4">
			{content}
			<div className="flex gap-4 items-end justify-end">
				<button
					className="bg-violet-500 text-white text-sm py-2 px-4 rounded-lg font-semibold hover:bg-violet-400 duration-200 active:bg-violet-600 "
					onClick={onDelete}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default DeleteAlert;
