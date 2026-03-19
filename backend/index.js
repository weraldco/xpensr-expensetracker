require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const { errorMiddleware } = require('./middleware/errorMiddleware');

const app = express();

const allowedOrigins = [
	process.env.CLIENT_URL,
	process.env.CLIENT_URL_ADMIN,
	process.env.CLIENT_URL_LOCAL,
].filter(Boolean);

app.use(
	cors({
		origin: (origin, callback) => {
			// Allow non-browser requests without an Origin header.
			if (!origin) return callback(null, true);

			// In production, default-deny if no explicit allowlist is configured.
			if (!allowedOrigins.length && process.env.NODE_ENV === 'production') {
				return callback(null, false);
			}

			if (allowedOrigins.includes(origin)) return callback(null, true);
			return callback(null, false);
		},
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: false,
	})
);

app.use(express.json());

connectDB();

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/income', incomeRoutes);
app.use('/api/v1/expense', expenseRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Centralized error handler (must be after routes).
app.use(errorMiddleware);

if (require.main === module) {
	const PORT = process.env.PORT || 5000;
	app.listen(PORT, () =>
		console.log(`Server is now running on this port: ${PORT}`)
	);
}

module.exports = app;
