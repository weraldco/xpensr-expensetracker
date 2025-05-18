const multer = require('multer');

// Configure storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const fileFilter = (req, file, cb) => {
	const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
	if (allowedTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error(`Only .jpeg, .png and.jpg format are allowed!`), false);
	}
};

const upload = multer({ fileFilter });

module.exports = upload;
// module.exports = fileFilter;
