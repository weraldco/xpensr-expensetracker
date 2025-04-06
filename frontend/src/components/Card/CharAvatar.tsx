import { getInitials } from '@/utils/helper';
import { FC } from 'react';

interface Props {
	user: string;
}

const CharAvatar: FC<Props> = ({ user }) => {
	const initials = getInitials(user);
	return (
		<div className="flex items-center justify-center text-3xl rounded-full  bg-gray-100 px-10 py-5">
			{initials}
		</div>
	);
};

export default CharAvatar;
