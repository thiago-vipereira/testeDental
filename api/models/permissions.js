const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
	permissions: [{
		name: String,
		options: [{
			view: Boolean,
			edit: Boolean,
			delete: Boolean
		}]
	}],
});
const Permissions = mongoose.model('permissions', permissionSchema);
module.exports = Permissions;