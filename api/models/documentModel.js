const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const documentModelSchema = new Schema({
	name: String,
	html: String,
	type: {
		type: String
	},
	active: Boolean
});

const DocumentModel = mongoose.model('documentModel', documentModelSchema);
module.exports = DocumentModel;