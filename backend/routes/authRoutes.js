const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
	registerUser,
	loginUser,
	getUserInfo,
	testUpload,
} = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const { rateLimit } = require('../middleware/rateLimitMiddleware');

cloudinary.config({
	cloud_name: 'dovviqnop',
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	// secure: true,
});

const router = express.Router();

const loginLimiter = rateLimit({
	windowMs: Number(process.env.RATE_LIMIT_LOGIN_WINDOW_MS) || 60 * 1000,
	max: Number(process.env.RATE_LIMIT_LOGIN_MAX) || 10,
});

const uploadLimiter = rateLimit({
	windowMs: Number(process.env.RATE_LIMIT_UPLOAD_WINDOW_MS) || 10 * 60 * 1000,
	max: Number(process.env.RATE_LIMIT_UPLOAD_MAX) || 5,
	keyGenerator: (req) => req.user?.id || req.ip,
});

router.post('/register', registerUser);
router.post('/login', loginLimiter, loginUser);
router.get('/getUser', protect, getUserInfo);

router.post(
	'/test-upload',
	protect,
	uploadLimiter,
	upload.single('image'),
	async (req, res) => {
	if (!req.file) {
		return res.status(400).json({ message: 'No file to upload' });
	}

	const fileBuffer = req.file.buffer;

	const streamUpload = (buffer) => {
		return new Promise((resolve, reject) => {
			const stream = cloudinary.uploader.upload_stream((error, result) => {
				if (result) resolve(result);
				else reject(error);
			});
			streamifier.createReadStream(buffer).pipe(stream);
		});
	};

	try {
		const result = await streamUpload(fileBuffer);
		res.json(result);
	} catch (err) {
		res.status(500).json({ message: 'Upload failed' });
	}
	}
);

module.exports = router;
