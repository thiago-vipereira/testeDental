const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const estimateSchema = new Schema({
	treatment: {
	    type: Schema.Types.ObjectId,
	    ref: 'treatment'
	},
	procedures: [String],
	gross_amount: Number,
	discount: Number,
	net_amount: Number,
	initial_payment: Number,
	interest: Number,
	late_penalty: Number,
	daily_penalty: Number,
	installments_number: Number,
	installments: {
	    type: Schema.Types.ObjectId,
	    ref: 'installment'
	},
	paid_amount: Number,
	status: String,
	expiration_date: Date,
	issue_date: Date
});

const Estimate = mongoose.model('estimate', estimateSchema);
module.exports = Estimate;