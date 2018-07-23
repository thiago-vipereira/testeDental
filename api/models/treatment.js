const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const treatmentSchema = new Schema({
	patient_id: {
		type: String,
		required: true
	},
	name: String,
	date: Date,
	approved: Boolean,
	active: Boolean,
	list_id: String,
	treatment: [],
	budgets: [{
		procedures: [],
		approved: Boolean,
		payment_type: String,
		parcel_number: Number,
		entrance: { value: Number, value_type: String, expiration: Date },
		discount: { value: Number, value_type: String },
		budget_expiration: Date,
		parcels:[]
	}],
	tooth_18: {
		status: String,
		procedures:[],
	},
	tooth_17: {
		status: String,
		procedures:[],
	},
	tooth_16: {
		status: String,
		procedures:[],
	},
	tooth_15: {
		status: String,
		procedures:[],
	},
	tooth_14: {
		status: String,
		procedures:[],
	},
	tooth_13: {
		status: String,
		procedures:[],
	},
	tooth_12: {
		status: String,
		procedures:[],
	},
	tooth_11: {
		status: String,
		procedures:[],
	},
/////////////
	tooth_55: {
		status: String,
		procedures:[],
	},
	tooth_54: {
		status: String,
		procedures:[],
	},
	tooth_53: {
		status: String,
		procedures:[],
	},
	tooth_52: {
		status: String,
		procedures:[],
	},
	tooth_51: {
		status: String,
		procedures:[],
	},
////////////
	tooth_21: {
		status: String,
		procedures:[],
	},
	tooth_22: {
		status: String,
		procedures:[],
	},
	tooth_23: {
		status: String,
		procedures:[],
	},
	tooth_24: {
		status: String,
		procedures:[],
	},
	tooth_25: {
		status: String,
		procedures:[],
	},
	tooth_26: {
		status: String,
		procedures:[],
	},
	tooth_27: {
		status: String,
		procedures:[],
	},
	tooth_28: {
		status: String,
		procedures:[],
	},
////////////
	tooth_61: {
		status: String,
		procedures:[],
	},
	tooth_62: {
		status: String,
		procedures:[],
	},
	tooth_63: {
		status: String,
		procedures:[],
	},
	tooth_64: {
		status: String,
		procedures:[],
	},
	tooth_65: {
		status: String,
		procedures:[],
	},
///////////////
	tooth_48: {
		status: String,
		procedures:[],
	},
	tooth_47: {
		status: String,
		procedures:[],
	},
	tooth_46: {
		status: String,
		procedures:[],
	},
	tooth_45: {
		status: String,
		procedures:[],
	},
	tooth_44: {
		status: String,
		procedures:[],
	},
	tooth_43: {
		status: String,
		procedures:[],
	},
	tooth_42: {
		status: String,
		procedures:[],
	},
	tooth_41: {
		status: String,
		procedures:[],
	},
//////////////
	tooth_85: {
		status: String,
		procedures:[],
	},
	tooth_84: {
		status: String,
		procedures:[],
	},
	tooth_83: {
		status: String,
		procedures:[],
	},
	tooth_82: {
		status: String,
		procedures:[],
	},
	tooth_81: {
		status: String,
		procedures:[],
	},
////////////
	tooth_31: {
		status: String,
		procedures:[],
	},
	tooth_32: {
		status: String,
		procedures:[],
	},
	tooth_33: {
		status: String,
		procedures:[],
	},
	tooth_34: {
		status: String,
		procedures:[],
	},
	tooth_35: {
		status: String,
		procedures:[],
	},
	tooth_36: {
		status: String,
		procedures:[],
	},
	tooth_37: {
		status: String,
		procedures:[],
	},
	tooth_38: {
		status: String,
		procedures:[],
	},
////////////
	tooth_71: {
		status: String,
		procedures:[],
	},
	tooth_72: {
		status: String,
		procedures:[],
	},
	tooth_73: {
		status: String,
		procedures:[],
	},
	tooth_74: {
		status: String,
		procedures:[],
	},
	tooth_75: {
		status: String,
		procedures:[],
	},

});

const Treatment = mongoose.model('treatment', treatmentSchema);
module.exports = Treatment;