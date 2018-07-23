const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const savedCardSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	kind: String,
	element: Array,
	color: String,
	size: { w: Number, h: Number }
});

const Card = mongoose.model('savedCard', savedCardSchema);
module.exports = Card;