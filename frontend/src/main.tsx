import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import UserProvider from './context/userContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
	<UserProvider>
		<BrowserRouter>
			<StrictMode>
				<App />
			</StrictMode>
		</BrowserRouter>
	</UserProvider>
);
