const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { ApiError } = require('../middleware/errorMiddleware');

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register new User
exports.registerUser = async (req, res, next) => {
	const { fullName, email, password, profileImageUrl } = req.body;

	// Check missing fields.
	if (!fullName || !email || !password) {
		throw new ApiError(400, 'All fields are required!');
	}

	try {
		// Check if email already exist
		const existingUser = await User.findOne({ email });
		if (existingUser)
			throw new ApiError(400, 'Email already in use..');

		const user = await User.create({
			fullName,
			email,
			password,
			profileImageUrl,
		});

		// Do not leak password hashes to the client.
		const userToReturn = user.toObject();
		delete userToReturn.password;

		res.status(201).json({
			id: user._id,
			user: userToReturn,
			token: generateToken(user._id),
		});
	} catch (error) {
		return next(error);
	}
};

// Login user
exports.loginUser = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new ApiError(400, 'All fields are required!');
	}
	try {
		const user = await User.findOne({ email });
		if (!user) {
			throw new ApiError(400, "User doesn't exist!");
		}
		if (!(await user.comparePassword(password))) {
			throw new ApiError(400, 'Incorrect password!');
		}

		// Do not leak password hashes to the client.
		const userToReturn = user.toObject();
		delete userToReturn.password;

		res.status(200).json({
			id: user._id,
			user: userToReturn,
			token: generateToken(user._id),
		});
	} catch (error) {
		return next(error);
	}
};

// Get User info
exports.getUserInfo = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id).select('-password');

		if (!user) {
			throw new ApiError(404, 'User not found!');
		}

		res.status(200).json(user);
	} catch (error) {
		return next(error);
	}
};

// exports.test = async (req, res) => {
// 	// if (!req.file) {
// 	// 	return res.status(400).json({ message: 'No file to upload' });
// 	// }

// 	console.log('test');

// 	try {
//
// 		const { image } = req.body;
// 		const url = '';
// 		res.status(200).json({ message: 'test' });
// 	} catch (error) {
// 		res.status(500).json({
// 			message: 'Error fetching data from database',
// 			error: error.message,
// 		});
// 	}
// };
