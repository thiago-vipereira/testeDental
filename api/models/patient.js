const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
	clinic_id: {
	    type: Schema.Types.ObjectId,
	    ref: 'clinic'
	},
	name: String,
	telephones: [{
		name: String,
		value: {
			type: String,
			required: true
		}
	}],
	email: String,
	address: String,
	state: String,
	city: String,
	zip: String,
	registry: Number,
	birthday: Date,
	age: Number,
	gender: String,
	martial: String,  //estado civil
	profession: String,
	civil_id: String,
	cpf: String,
	company: String,
	father: String,
	mother: String,
	father_profession: String,
	mother_profession: String,
	insurance: String, //plano de saude
	insurance_number: Number,
	sponsor: String, // responsavel
	sponsor_insurance_number: Number,
	sponsor_cpf: String,
	indication: String,
	first_appointment: Date,
	treatment_time: String,
	picture: String,
	status: String, // situação do paciente
	active: {
		type: Boolean,
		default: true
	},
	extra: [String],
	prescription: [{
		issue_date: Date,
		medicines: [{
			name: {
				type: String,
				required: true
			}, 
			instructions: String
		}]
	}],
	folder: [{
		name: {
			type: String,
			required: true
		},
		files: [{
			name: {
				type: String,
				required: true
			},
			observation: String,
			url: String,
			type: String
		}]
	}],
	clinical_note: [{ 
		issue_date: Date,
		note: {
			type: String,
			required: true
		},
		active: {
			type: Boolean,
			default: true
		}, 
	}],
	odontogram: [{
		odontogram_id: {
			type: String,
			required: true
		},
		date: Date,
		active: {
			type: Boolean,
			default: true
		}, 
	}],
	created_at: Date,
	updated_at: Date,
	updated_by: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	gallery: [{
		hash: String,
		url: String,
		dir: String,
		filename: String,
		tag: String,
		ext: String
	}],
	files: Object,
	anamnesis: [{
		name: String,
		questions: Array
	}],
	documentModel: [{
		name: String,
		html: String,
		type: {
			type: String
		}
	}]
});

// it happens before every 'save'
patientSchema.pre('save', function(next) {
	const now = new Date();
	const doc = this;

	if (!doc.created_at) {
	// new document
		doc.created_at = now;
	};

	doc.updated_at = now;

	// auto-increment registry number
	doc.constructor.count((err, count) => {
		if (err) { return next(err) }
		
		// doc.registry = count + 1;
		return next();
	});
});

const Patient = mongoose.model('patient', patientSchema);
module.exports = Patient;