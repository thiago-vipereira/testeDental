const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authUserSchema = new Schema({
	id_user: {
		type: String,
		required: true
	},
	clinic_data: {
		type: String,
		required: true
	},
	date: Date,
	token: {
		type: String,
		required: true
	}
});

const AuthUser = mongoose.model('authUser', authUserSchema);
module.exports = AuthUser;