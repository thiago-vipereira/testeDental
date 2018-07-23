const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const dentistSchema = new Schema({
	clinic_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'clinic',
	    required: true
	},
	user_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'user'
	},
	schedule: {
	    sun: [{ start: String, end: String}],
	    mon: [{ start: String, end: String}],
	    tue: [{ start: String, end: String}],
	    wed: [{ start: String, end: String}],
	    thu: [{ start: String, end: String}],
	    fri: [{ start: String, end: String}],
	    sat: [{ start: String, end: String}]
	},
	vacation_start: Date,
	vacation_end: Date,
	dm_code: String,
	name: {
		type: String,
		required: true
	},
	address: String,
	city: String,
	state: String,
	zip: String,
	cpf: String,
	civil_id: String,
	cro: {
		type: String,
		required: true
	},
	commission: Number,
	email: String,
	telephones: [{
		name: String,
		value: String
	}],
	birthday: Date,
	speciality: String,
	color: String,
	active: {
		type: Boolean,
		default: true
	},
	created_at: Date,
	updated_at: Date,
	updated_by: {
	  type: Schema.Types.ObjectId,
	  ref: 'user'
	}
});

dentistSchema.pre('save', function(next) {
  const now = new Date();
  
  if (!this.created_at) {
    // new document
    this.created_at = now;
  };
  
  this.updated_at = now;

  next();
});

const Dentist = mongoose.model('dentist', dentistSchema);
module.exports = Dentist;