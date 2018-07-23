const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	address: String,
	city: String,
	state: String,
	//role: {
	//		type: Schema.Types.ObjectId,
	//		ref: 'role'
	//},
	telephones: [{
		name: String,
		value: String
	}],
	clinics: [{
		clinic_id: {
			type: Schema.Types.ObjectId,
			ref: 'clinic',
			required: true
		},
		name: String,
		logo_url: String,
		clinic_data: {
			type: String,
			required: true
		}
	}],
	permissions: [{
		name: String,
		clinic: {
			type: Schema.Types.ObjectId,
			ref: 'clinic',
			required: true
		},
		actions: [{
			read: Boolean,
			write: Boolean,
			delete: Boolean
		}]
	}],
	zip: String,
	password: {
		type: String,
		required: true
	},
	active: {
		type: Boolean,
		default: true
	},
	gender: String,
	last_login: Date,
	locked: Boolean,
	birthday: Date,
	created_at: Date,
	updated_at: Date,
	updated_by: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	token: String,
	token_exp: Date,
	// dashboard: {
	// 	card: [{
	// 		kind: String,
	// 		layout: {key: String, grid: { x: Number, y: Number, w: Number, h: Number, minH: Number, minW: Number, static: Boolean }},
	// 		element: Array,
	// 		color: String
	// 	}],
	// 	saved: [{
	// 		name: String,
	// 		kind: String,
	// 		card: [{
	// 			element: Array,
	// 			color: String,
	// 			size: { w: Number, h: Number }
	// 		}]
	// 	}]
	// }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

// it happens before every 'save'
userSchema.pre('save', function(next) {
	const now = new Date();
	
	if (!this.created_at) {
		// new document
		this.created_at = now;
	};
	
	this.updated_at = now;

	next();
});

const User = mongoose.model('user', userSchema);
module.exports = User;