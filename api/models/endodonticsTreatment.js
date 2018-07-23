const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const endodonticsTreatmentSchema = new Schema({
	patient_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'patient'
	},
	tooth: Number,
	canales: [{
		canal: String,
		length: Number,
		real_length: Number,
		work_length: Number,
		rasp: Number,
		drill: Number,
		cores: Number,
		reference: Number
	}],
	x_ray: String,
	diagnosis: String,
	trauma: String,
	procedure: String,
	bandage: String,
	solutions: String,
	technique: String,
	filling: String,
	filling_cement: String,
	sessions: [{
		date: Date,
		procedures: String
	}],
	observations: String
});

const EndodonticsTreatment = mongoose.model('endodonticsTreatment', endodonticsTreatmentSchema);
module.exports = EndodonticsTreatment;