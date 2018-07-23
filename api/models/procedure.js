const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const procedureSchema = new Schema({
	code: String,
	description: String,
	group: String,
	target_type: String,
	target: String,
	faces: [String],
	price: Number,
	dentist_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'dentist'
	},
	done_at: Date,
	model: {
	    type: Schema.Types.ObjectId,
	    ref: 'procedureModel'
	},
	clinic_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'clinic'
	}
});

const Procedure = mongoose.model('procedure', procedureSchema);
module.exports = Procedure;