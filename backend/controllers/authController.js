const User = require('../models/User');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: 'dovviqnop',
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	// secure: true,
});

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register new User
exports.registerUser = async (req, res) => {
	const { fullName, email, password, profileImageUrl } = req.body;

	// Check missing fields.
	if (!fullName || !email || !password) {
		return res.status(400).json({ message: 'All fields are required!' });
	}

	try {
		// Check if email already exist
		const existingUser = await User.findOne({ email });
		if (existingUser)
			return res.status(400).json({ message: 'Email already in use..' });

		const user = await User.create({
			fullName,
			email,
			password,
			profileImageUrl,
		});

		res.status(201).json({
			id: user._id,
			user,
			token: generateToken(user._id),
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error registering user', error: error.message });
	}
};

// Login user
exports.loginUser = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: 'All fields are required!' });
	}
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "User doesn't exist!" });
		}
		if (!(await user.comparePassword(password))) {
			return res.status(400).json({ message: 'Incorrect password!' });
		}

		res.status(200).json({
			id: user._id,
			user,
			token: generateToken(user._id),
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error logging in user', error: error.message });
	}
};

// Get User info
exports.getUserInfo = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');

		if (!user) {
			return res.status(404).json({ message: 'User not found!' });
		}

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({
			message: 'Error fetching data from database',
			error: error.message,
		});
	}
};

exports.testUpload = async (req, res) => {
	try {
		const results = await cloudinary.uploader.upload(
			'./uploads/1743368011561-panda.png'
		);
		const url = cloudinary.url(results.public_id, {
			transformation: [
				{
					quality: 'auto',
					fetch_format: 'auto',
				},
				{
					width: 1200,
					height: 1200,
					crop: 'fill',
					gravity: 'auto',
				},
			],
		});
		res.status(200).json({ url });
	} catch (error) {
		res.status(500).json({
			message: 'Error fetching data from database',
			error: error.message,
		});
	}
};
