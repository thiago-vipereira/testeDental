const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
	user: String,
	type: String,
	layout: {key: String, grid: { x: Number, y: Number, w: Number, h: Number, minH: Number, minW: Number, static: Boolean }},
	element: Array,
	color: String
});

const Card = mongoose.model('card', cardSchema);
module.exports = Card;