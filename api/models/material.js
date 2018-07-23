const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const materialSchema = new Schema({
	name: String,
	quantity: Number,
	min: Number,
	max: Number,
	vendor_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'vendor'
	},
	clinic_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'clinic'
	},
	active:{
		default: true,
		type: Boolean,
	},
	storage:[{
		registry_type: String,
		quantity: Number,
		date: Date
	}]
});

const Material = mongoose.model('material', materialSchema);
module.exports = Material;