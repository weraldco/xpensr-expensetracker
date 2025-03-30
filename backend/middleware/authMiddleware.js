const jwt = require('jsonwebtoken');
const user = require('../models/User');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
	let token = req.headers.authorization?.split(' ')[1];
	if (!token)
		return res.status(401).json({ message: 'Not authorize, no token!' });

	try {
		const decode = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findById(decode.id).select('-password');
		next();
	} catch (error) {
		res.status(401).json({
			message: 'Not authorized, invalid token!',
			error: error.message,
		});
	}
};
