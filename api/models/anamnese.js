const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const anamneseSchema = new Schema({
	date: Date,
	patient_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'patient'
	},
	model: {
	    type: Schema.Types.ObjectId,
	    ref: 'anamneseModel'
	},
	answers: [{
	    type: Schema.Types.ObjectId,
	    ref: 'answer'
	}],
});

const Anamnese = mongoose.model('anamnese', anamneseSchema);
module.exports = Anamnese;