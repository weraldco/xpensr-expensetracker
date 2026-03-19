const rateLimit = ({
	windowMs = 60 * 1000,
	max = 10,
	keyGenerator,
}) => {
	const requests = new Map(); // key -> number[] of request timestamps

	return (req, res, next) => {
		const key = keyGenerator ? keyGenerator(req) : req.ip;
		const now = Date.now();
		const existing = requests.get(key) || [];

		const recent = existing.filter((t) => now - t < windowMs);
		recent.push(now);

		requests.set(key, recent);

		if (recent.length > max) {
			return res
				.status(429)
				.json({ message: 'Too many requests. Please try again later.' });
		}

		next();
	};
};

module.exports = { rateLimit };

