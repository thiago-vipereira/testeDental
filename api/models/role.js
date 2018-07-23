const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
	name: String,
	permissions: [{
		name: String,
		actions: [{
			read: Boolean,
			write: Boolean
		}]
	}]
});

const Role = mongoose.model('role', roleSchema);
module.exports = Role;