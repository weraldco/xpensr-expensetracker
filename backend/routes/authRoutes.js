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

cloudinary.config({
	cloud_name: 'dovviqnop',
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	// secure: true,
});

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getUser', protect, getUserInfo);

router.post('/test-upload', upload.single('image'), async (req, res) => {
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
		res.status(500).json({ error: 'Upload failed', details: err });
	}
});

module.exports = router;
