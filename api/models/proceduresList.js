const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const proceduresListSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	clinic_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'clinic',
	    required: true
	},
	index: Number,
	groups: [{
		name: {
			type: String,
			required: true
		},
		active: {
			type: Boolean,
			default: true
		},
		procedures: [{
			code: {
				type: String,
				required: true
			},
			description: {
				type: String,
				required: true
			},
			procedure_type: {
				type: String,
				required: true
			},
			color: String,
			price: {
				type: Number,
				required: true
			},
			active: {
				type: Boolean,
				default: true
			}
		}]
	}],
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

proceduresListSchema.pre('save', function(next) {
  const now = new Date();
  
  if (!this.created_at) {
    // new document
    this.created_at = now;
  };
  
  this.updated_at = now;

  next();
});

const ProceduresList = mongoose.model('proceduresList', proceduresListSchema);
module.exports = ProceduresList;