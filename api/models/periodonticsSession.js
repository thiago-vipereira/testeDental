const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const periodonticsSessionSchema = new Schema({
	date: Date,
	patient_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'patient'
	},
	bleeding: [{
		tooth: Number,
		vd: Number,
		v: Number,
		vm: Number,
		ld: Number,
		l: Number,
		lm: Number
	}],
	gum_level: [{
		tooth: Number,
		vd: Number,
		v: Number,
		vm: Number,
		ld: Number,
		l: Number,
		lm: Number
	}],
	bone_level: [{
		tooth: Number,
		vd: Number,
		v: Number,
		vm: Number,
		ld: Number,
		l: Number,
		lm: Number
	}],
	mobility: [{
		tooth: Number,
		value: Number
	}],
	furcation_damage: [{
		tooth: Number,
		distal: Number,
		mesial: Number,
		vestibular: Number,
		lingual: Number
	}]
});

const PeriodonticsSession = mongoose.model('periodonticsSession', periodonticsSessionSchema);
module.exports = PeriodonticsSession;