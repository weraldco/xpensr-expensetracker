import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import LoadingState from './components/LoadingState';
const Home = React.lazy(() => import('./pages/Dashboard/Home'));
const Income = React.lazy(() => import('./pages/Dashboard/Income'));
const Expenses = React.lazy(() => import('./pages/Dashboard/Expenses'));
const RegistrationForm = React.lazy(
	() => import('./pages/Auth/RegistrationForm')
);
const LoginForm = React.lazy(() => import('./pages/Auth/LoginForm'));

function App() {
	return (
		<div className="flex flex-col">
			<Suspense fallback={<LoadingState />}>
				<Routes>
					<Route path="/" element={<Root />} />
					<Route path="/login" Component={LoginForm} />
					<Route path="/registration" Component={RegistrationForm} />
					<Route path="/dashboard" Component={Home} />
					<Route path="/expenses" Component={Expenses} />
					<Route path="/income" Component={Income} />
				</Routes>
			</Suspense>
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
