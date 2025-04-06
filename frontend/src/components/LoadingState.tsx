import { VscLoading } from 'react-icons/vsc';

const LoadingState = () => {
	return (
		<div className="w-full h-screen flex flex-col items-center justify-center gap-4">
			<VscLoading className="text-5xl animate-spin" />
			<span className="text-sm">Loading..</span>
		</div>
	);
};

export default LoadingState;
