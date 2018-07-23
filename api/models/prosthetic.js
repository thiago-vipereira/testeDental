const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const prostheticSchema = new Schema({
	clinic_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'clinic'
	},
	name: String,
	address: String,
	zip: String,
	city: String,
	state: String,
	email: String,
	contact: String,
	website: String,
	telephones: [{
		name: String,
		value: String
	}],
	cpf: String,
	civil_id: String,
	cro: String,
	cnpj: String
});

const Prosthetic = mongoose.model('prosthetic', prostheticSchema);
module.exports = Prosthetic;