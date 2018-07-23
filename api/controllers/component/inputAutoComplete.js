const Data = require('../../services/connect');

const Patient = require('../../models/patient');
const Dentist = require('../../models/dentist');
const ProceduresList = require('../../models/proceduresList');

const selectModel = function(model, db){
	
	switch(model) {
		case 'patient':
			return db.model('patient', Patient.patientSchema);
		case 'dentist':
			return db.model('dentist', Dentist.dentistSchema);
		case 'proceduresList':
			return db.model('proceduresList', ProceduresList.proceduresListSchema);
		default:
			return null;
	}
};

module.exports = {
	fetch(req, res, next){
		
		const props = req.body;
		let text = props.text;
		let model = props.model;
		let attribute = props.attribute;
		let limit = props.limit;
		let order = attribute[0];
		var condition = [];
		var fields = {};

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let modelDB = selectModel(model, db);
		
		attribute.forEach( item => {
			var obj = {};
			obj[item] = {$regex : text.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&') , $options: 'i'};
			condition.push(obj);
			fields[item] = 1;
		});	

		modelDB.find({ $or: condition }, fields ).limit(limit)
		.then(item => {
			res.send(item);
		})
		.catch(next);
	},
	patientFetch(req, res, next){
		
		const props = req.body;
		let text = props.text;
		let limit = props.limit;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let PatientDB = db.model('patient', Patient.patientSchema);

		PatientDB.find({ 'name': {$regex : text.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&') , $options: 'i'} }, {name:1, telephones:1, registry:1 } ).limit(limit)
		.then(item => {
			res.send(item);
		})
		.catch(next);
	}
};