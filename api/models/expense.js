const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
	clinic_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'clinic'
	},
	description: String,
	value: Number,
	paid_value: Number,
	expiration_date: Date,
	payment_date: Date,
	receipt: String,
	installment_number: Number,
	installment_total: Number,
	status: String,
	observation: String,
	dentist_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'dentist'
	},
	vendor_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'vendor'
	},
	type: String
});

const Expense = mongoose.model('expense', expenseSchema);
module.exports = Expense;