const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const msgSentSchema = new Schema({
	clinic_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'clinic'
	},
	patients: [{
	    type: Schema.Types.ObjectId,
	    ref: 'patient'
	}],
	type: String,
	sent_date: Date,
	msg: String
});

const MsgSent = mongoose.model('msgSent', msgSentSchema);
module.exports = MsgSent;