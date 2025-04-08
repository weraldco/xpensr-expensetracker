import { Navigate, Route, Routes } from 'react-router';
import LoginForm from './pages/Auth/LoginForm';
import RegistrationForm from './pages/Auth/RegistrationForm';
import Expenses from './pages/Dashboard/Expenses';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';

function App() {
	return (
		<div className="flex flex-col">
			<Routes>
				<Route path="/" element={<Root />} />
				<Route path="/login" element={<LoginForm />} />
				<Route path="/registration" element={<RegistrationForm />} />
				<Route path="/dashboard" element={<Home />} />
				<Route path="/expenses" element={<Expenses />} />
				<Route path="/income" element={<Income />} />
			</Routes>
		</div>
	);
}

export default App;

const Root = () => {
	// Check if token exist in localstorage
	const isAuthenticated = !!localStorage.getItem('token');

	// Redirect to dashboard if authenticated, otherwise to login
	return isAuthenticated ? (
		<Navigate to="/dashboard" />
	) : (
		<Navigate to="/login" />
	);
};
