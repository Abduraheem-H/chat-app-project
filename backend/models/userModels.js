import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	fullName: {
		type: 'string',
		required: true
	},
	username: {
		type: 'string',
		required: true,
		unique: true,
	},
	password: {
		type: 'string',
		required: true,
		minLength: 8
	},
	gender: {
		type: 'string',
		required: true,
		enum: ['male', 'female']
	},
	profilePicture: {
		type: 'string',
		default: '',
	},
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;