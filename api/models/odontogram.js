const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const odontogramSchema = new Schema({
	patient_id: {
		type: String,
		required: true
	},
	date: Date,
	active: Boolean,
	tooth_18: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_17: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_16: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_15: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_14: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_13: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_12: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_11: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_21: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_22: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_23: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_24: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_25: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_26: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_27: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_28: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_48: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_47: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_46: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_45: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_44: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_43: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_42: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_41: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_31: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_32: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_33: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_34: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_35: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_36: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_37: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	},
	tooth_38: {
		status: String,
		deciduous_number: Number,
		plaque: [String],
		mobility: Number,
		restauration: [String],
		restauration_material: String,
		crown_implant: Boolean,
		crown_fracture: Boolean,
		bridge: String,
		caries: [String],
		surgery: Boolean
	}
});

const Odontogram = mongoose.model('odontogram', odontogramSchema);
module.exports = Odontogram;