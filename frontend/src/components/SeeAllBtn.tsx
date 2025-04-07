import { FC } from 'react';
import { LuArrowRight } from 'react-icons/lu';
import { Link } from 'react-router';

interface Props {
	redirectTo: string;
}

const SeeAllBtn: FC<Props> = ({ redirectTo }) => {
	return (
		<Link to={redirectTo} className="card-btn poppins-semibold">
			See All <LuArrowRight size={15} />
		</Link>
	);
};

export default SeeAllBtn;
