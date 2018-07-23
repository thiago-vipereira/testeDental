const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
	clinic_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'clinic'
	},
	name: String,
	address: String,
	state: String,
	city: String,
	email: String,
	contact: String,
	website: String,
	telephones: [{
		name: String,
		value: String
	}],
	active: {
		type: Boolean,
		default: true
	}
});

const Vendor = mongoose.model('vendor', vendorSchema);
module.exports = Vendor;