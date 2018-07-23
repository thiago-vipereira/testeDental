const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	kind: String,
	layout: {key: String, grid: { x: Number, y: Number, w: Number, h: Number, minH: Number, minW: Number, static: Boolean }},
	element: Array,
	color: String
});

const Card = mongoose.model('card', cardSchema);
module.exports = Card;