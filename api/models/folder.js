/*const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const folderSchema = new Schema({
	name: String,
	files: [{
	    type: Schema.Types.ObjectId,
	    ref: 'file'
	}],
	patient_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'patient'
	}
});

const Folder = mongoose.model('folder', folderSchema);
module.exports = Folder;*/