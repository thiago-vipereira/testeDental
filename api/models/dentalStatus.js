const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const dentalStatusSchema = new Schema({
	patient_id: {
		type: String,
		required: true
	},
	tooth_18: {
		status: String,
	},
	tooth_17: {
		status: String,
	},
	tooth_16: {
		status: String,
	},
	tooth_15: {
		status: String,
	},
	tooth_14: {
		status: String,
	},
	tooth_13: {
		status: String,
	},
	tooth_12: {
		status: String,
	},
	tooth_11: {
		status: String,
	},
/////////////
	tooth_55: {
		status: String,
	},
	tooth_54: {
		status: String,
	},
	tooth_53: {
		status: String,
	},
	tooth_52: {
		status: String,
	},
	tooth_51: {
		status: String,
	},
////////////
	tooth_21: {
		status: String,
	},
	tooth_22: {
		status: String,
	},
	tooth_23: {
		status: String,
	},
	tooth_24: {
		status: String,
	},
	tooth_25: {
		status: String,
	},
	tooth_26: {
		status: String,
	},
	tooth_27: {
		status: String,
	},
	tooth_28: {
		status: String,
	},
////////////
	tooth_61: {
		status: String,
	},
	tooth_62: {
		status: String,
	},
	tooth_63: {
		status: String,
	},
	tooth_64: {
		status: String,
	},
	tooth_65: {
		status: String,
	},
///////////////
	tooth_48: {
		status: String,
	},
	tooth_47: {
		status: String,
	},
	tooth_46: {
		status: String,
	},
	tooth_45: {
		status: String,
	},
	tooth_44: {
		status: String,
	},
	tooth_43: {
		status: String,
	},
	tooth_42: {
		status: String,
	},
	tooth_41: {
		status: String,
	},
//////////////
	tooth_85: {
		status: String,
	},
	tooth_84: {
		status: String,
	},
	tooth_83: {
		status: String,
	},
	tooth_82: {
		status: String,
	},
	tooth_81: {
		status: String,
	},
////////////
	tooth_31: {
		status: String,
	},
	tooth_32: {
		status: String,
	},
	tooth_33: {
		status: String,
	},
	tooth_34: {
		status: String,
	},
	tooth_35: {
		status: String,
	},
	tooth_36: {
		status: String,
	},
	tooth_37: {
		status: String,
	},
	tooth_38: {
		status: String,
	},
////////////
	tooth_71: {
		status: String,
	},
	tooth_72: {
		status: String,
	},
	tooth_73: {
		status: String,
	},
	tooth_74: {
		status: String,
	},
	tooth_75: {
		status: String,
	},

});

const DentalStatus = mongoose.model('dentalStatus', dentalStatusSchema);
module.exports = DentalStatus;