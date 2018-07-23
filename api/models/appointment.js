const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
	clinic_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'clinic'
	},
	patient_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'patient'
	},
	dentist_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'dentist'
	},
	start: Date,
	end: Date,
	description: String,
	status: String,
	procedures: [{
	    type: Schema.Types.ObjectId,
	    ref: 'procedure'
	}],
	reschedule_date: Date
});

const Appointment = mongoose.model('appointment', appointmentSchema);
module.exports = Appointment;