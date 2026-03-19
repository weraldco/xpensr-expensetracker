class ApiError extends Error {
	constructor(statusCode, message) {
		super(message);
		this.statusCode = statusCode;
	}
}

const errorMiddleware = (err, req, res, next) => {
	// Delegate to default Express handler if headers already sent.
	if (res.headersSent) return next(err);

	// Known/intentional API errors
	if (err instanceof ApiError) {
		return res.status(err.statusCode).json({ message: err.message });
	}

	// Multer file upload errors (e.g., file size limits)
	if (err?.code === 'LIMIT_FILE_SIZE') {
		return res.status(413).json({ message: 'File too large.' });
	}

	// Multer/fileFilter validation errors
	// fileFilter errors come through as normal Error objects with a safe message.
	if (
		err?.name === 'MulterError' ||
		(typeof err?.message === 'string' &&
			(err.message.toLowerCase().includes('only .jpeg') ||
				err.message.toLowerCase().includes('format') ||
				err.message.toLowerCase().includes('upload')))
	) {
		return res.status(400).json({ message: err.message || 'Upload failed.' });
	}

	// Handle common Mongoose/Mongo validation issues without leaking internals.
	if (err?.name === 'CastError') {
		return res.status(400).json({ message: 'Invalid id.' });
	}

	// Fallback: never leak internal error details to the client.
	// eslint-disable-next-line no-console
	console.error('Unhandled error:', err?.message || err);
	return res.status(500).json({ message: 'Server Error' });
};

module.exports = { ApiError, errorMiddleware };

