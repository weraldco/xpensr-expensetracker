const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
	{
		fullName: { type: String, require: true },
		email: { type: String, require: true },
		password: { type: String, require: true },
		profileImageUrl: { type: String, require: true },
	},
	{ timeStamps: true }
);

// Hash password before saving
UserSchema.pre('save', async (next) => {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

// Compare passwords
UserSchema.methods.comparePassword = async (candidatePassword) => {
	return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
