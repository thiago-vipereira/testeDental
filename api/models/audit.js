const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const auditSchema = new Schema({
	user: {
		type: String,
	},
	date: {
		type: Date,
	},
	item_id: {
		type: String,
	},
	module: {
		type: String,
	},
	model: {
		type: String,
	},
	type: {
		type: String,
	},
	model: {
		type: String,
	},
	modification: [Array, Array]
	,
	description: {
		type: String,
	}
});

// it happens before every 'save'
auditSchema.pre('save', function(next) {
	const now = new Date();
	
	if (!this.created_at) {
		// new document
		this.created_at = now;
	};

	next();
});

const Audit = mongoose.model('audit', auditSchema);
module.exports = Audit;