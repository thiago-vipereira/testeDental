const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const anamneseModelSchema = new Schema({
	name: String,
	questions: [{
		kind: String,
		question: String,
		options:[{
			content: String,
			alert: Boolean
		}]
	}],
	active: Boolean
});

const AnamneseModel = mongoose.model('anamneseModel', anamneseModelSchema);
module.exports = AnamneseModel;