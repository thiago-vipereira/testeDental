/*const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const procedureModelSchema = new Schema({
	code: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	group_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'groupProcedure',
	    required: true
	},
	target_type: {
		type: String,
		required: true
	},
	price: {
		type: Number,
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

procedureModelSchema.pre('save', function(next) {
  const now = new Date();
  
  if (!this.created_at) {
    // new document
    this.created_at = now;
  };
  
  this.updated_at = now;

  next();
});

const ProcedureModel = mongoose.model('procedureModel', procedureModelSchema);
module.exports = ProcedureModel;*/