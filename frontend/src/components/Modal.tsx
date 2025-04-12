import { FC, ReactNode } from 'react';
import { IoIosClose } from 'react-icons/io';
interface Props {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
}

const Modal: FC<Props> = ({ isOpen, onClose, title, children }) => {
	return (
		<div className="fixed top-0 right-0 left-0  bottom-0 z-50 flex justify-center items-center w-full h-[cal(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50">
			<div className="relative p-4 w-full max-w-2xl max-h-full">
				{/* Content */}
				<div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
					{/* Header */}
					<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
						<h3 className="text-lg font-medium text-gray-900 dark:text-white">
							{title}
						</h3>
						<button
							type="button"
							className="text-gray-400 bg-transparent hover:bg-gray-200  hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
							onClick={onClose}
						>
							<IoIosClose size={30}></IoIosClose>
						</button>
					</div>

					{/* Modal body */}
					<div className="p-4 md:p-5 space-y-4">{children}</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
