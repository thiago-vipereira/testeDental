const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const installmentSchema = new Schema({
	estimate: {
	    type: Schema.Types.ObjectId,
	    ref: 'estimate'
	},
	patient_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'patient'
	},
	order: Number,
	base_value: Number,
	value: Number,
	paid_value: Number,
	expiration_date: Date,
	payment_date: Date,
	received_date: Date,
	payment_type: String,
	bank_check: Number,
	bank: String,
	bank_branch: String,
	bank_account: Number,
	receipt: [{
		number: Number,
		issue_date: Date
	}],
	status: String
});

const Installment = mongoose.model('installment', installmentSchema);
module.exports = Installment;