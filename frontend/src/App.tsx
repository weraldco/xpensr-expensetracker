import { Route, Routes } from 'react-router';
import Sidebar from './components/Navbar/Sidebar';
import TopMenubar from './components/Navbar/TopMenubar';
import Expenses from './components/pages/Expenses';
import Home from './components/pages/Home';
import { default as Income } from './components/pages/Income';

function App() {
	return (
		<div className="flex flex-col">
			<TopMenubar />
			<Sidebar />
			<div className="absolute w-full pl-[220px] pt-[110px] h-screen  bg-[#f9f9f9] p-4 gap-4 flex flex-col">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/expenses" element={<Expenses />} />
					<Route path="/income" element={<Income />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
