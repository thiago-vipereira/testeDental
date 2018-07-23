const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const clinicSchema = new Schema({
	name: {
		type: String,
		required: true
	}, 
	address: String,
	zip: String,
	city: String,
	state: String,
	users: [{
			type: Schema.Types.ObjectId,
			ref: 'user'
	}],
	patients: [{
			type: Schema.Types.ObjectId,
			ref: 'patient'
	}],
	plan: {
		category: {
			type: Schema.Types.ObjectId,
			ref: 'plan'
		},
		expiration: Date
	},
	clinic_data: {
		type: String,
		required: true
	},
	active: {
		type: Boolean,
		default: true
	},
	credit_card:{
		name: String,
		fee: Number
	},
	logo_url: String,
	logo_clinic: String,
	document_header: String,
	document_footer:String,
	created_at: Date,
	updated_at: Date,
	updated_by: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	document_header: String,
	document_footer: String,
	gallery: [{
		url: String,
		filename: String,
		tag: String
	}]
});

// it happens before every 'save'
clinicSchema.pre('save', function(next) {
	const now = new Date();
	
	if (!this.created_at) {
		// new document
		this.created_at = now;
	};
	
	this.updated_at = now;

	next();
});

const Clinic = mongoose.model('clinic', clinicSchema);

module.exports = Clinic;