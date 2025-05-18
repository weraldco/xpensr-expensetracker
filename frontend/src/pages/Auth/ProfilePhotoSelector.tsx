/* eslint-disable @typescript-eslint/no-explicit-any */
import imageCompression from 'browser-image-compression';
import { useRef, useState } from 'react';
import { LuTrash, LuUpload, LuUser } from 'react-icons/lu';

const ProfilePhotoSelector = ({
	image,
	setImage,
}: {
	image: any;
	setImage: any;
}) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string>('');

	const handleImageChange = async (event: any) => {
		const file = event.target.files[0];
		const compressedFile = await imageCompression(file, {
			maxSizeMB: 1,
			maxWidthOrHeight: 800,
			useWebWorker: true,
		});
		if (compressedFile) {
			setImage(compressedFile);
			const preview = URL.createObjectURL(compressedFile);
			setPreviewUrl(preview);
		}
	};

	const handleRemoveImage = () => {
		setImage(null);
		setPreviewUrl('');
	};

	const onChooseFile = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};
	return (
		<div className="flex justify-center mb-6">
			<input
				type="file"
				accept="image/*"
				ref={inputRef}
				onChange={handleImageChange}
				className="hidden"
			/>
			{!image ? (
				<div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
					<LuUser className="text-4xl text-violet-400" />
					<button
						type="button"
						className="w-8 h-8 flex items-center justify-center bg-violet-400 text-white rounded-full absolute -bottom-1 -right-1"
						onClick={onChooseFile}
					>
						<LuUpload />
					</button>
				</div>
			) : (
				<div className="relative">
					<img
						src={previewUrl}
						alt="profile photo"
						className="w-20 h-20 rounded-full object-cover"
					/>
					<button
						type="button"
						className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1"
						onClick={handleRemoveImage}
					>
						<LuTrash />
					</button>
				</div>
			)}
		</div>
	);
};

export default ProfilePhotoSelector;
