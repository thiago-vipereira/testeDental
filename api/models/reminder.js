const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const reminderSchema = new Schema({
	user_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'user'
	},
	title: String,
	content: String,
	alarm_time: Date
});

const Reminder = mongoose.model('reminder', reminderSchema);
module.exports = Reminder;