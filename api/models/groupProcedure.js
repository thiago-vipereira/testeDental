/*const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const groupProcedureSchema = new Schema({
	list_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'proceduresList',
	    required: true
	},
	description: {
		type: String,
		required: true
	},
	created_at: Date,
	updated_at: Date,
	updated_by: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	active: {
		type: Boolean,
		default: true
	}
});

groupProcedureSchema.pre('save', function(next) {
  const now = new Date();
  
  if (!this.created_at) {
    // new document
    this.created_at = now;
  };
  
  this.updated_at = now;

  next();
});

const GroupProcedure = mongoose.model('groupProcedure', groupProcedureSchema);
module.exports = GroupProcedure;*/