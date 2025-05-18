import uploadImage from '@/utils/uploadImage';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import ProfilePhotoSelector from './Auth/ProfilePhotoSelector';

const Test = () => {
	const [profilePic, setProfilePic] = useState(null);
	const [loading, setLoading] = useState(false);
	const onSubmit = async () => {
		setLoading(true);
		if (profilePic) {
			const imgUploaded = await uploadImage(profilePic);
			if (imgUploaded.secure_url) {
				setLoading(false);
				console.log(imgUploaded.secure_url);
			} else {
				setLoading(true);
			}
		}
	};
	return (
		<div className="h-screen flex items-center justify-center flex-col">
			<ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
			<button
				className="px-4 py-2 bg-teal-400 text-white font-bold rounded-lg hover:scale-105 duration-200 active:-translate-y-2"
				onClick={onSubmit}
			>
				{!loading ? (
					'Submit'
				) : (
					<div className="animate-spin px-4 py-2">
						<AiOutlineLoading3Quarters />
					</div>
				)}
			</button>
		</div>
	);
};

export default Test;
