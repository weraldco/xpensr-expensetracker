const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const setupMongo = async () => {
	mongoServer = await MongoMemoryServer.create();
	process.env.MONGODB_URI = mongoServer.getUri();

	// Used by authController token generation
	process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_jwt_secret';
};

const teardownMongo = async () => {
	if (mongoServer) {
		await mongoose.connection.dropDatabase().catch(() => {});
		await mongoose.disconnect();
		await mongoServer.stop();
	}
};

module.exports = {
	setupMongo,
	teardownMongo,
};

