/*const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
	issue_date: Date,
	patient_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'patient'
	},
	medicines: [{
		name: String,
		instructions: String
	}]
});

const Prescription = mongoose.model('prescription', prescriptionSchema);
module.exports = Prescription;*/