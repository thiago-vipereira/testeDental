const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const emailSchema = new Schema({
  destination: [{
    patient_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'patient'
    },
    name: String,
    email: String
  }],
  sender: {
    user_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'user'
    },
    name: String,
  },
  title: String,
  html: String,
	sent_at: Date
});

const Email = mongoose.model('email', emailSchema);
module.exports = Email;