const Odontogram = require('../models/odontogram');
const Data = require('../services/connect');

module.exports = {
	edit(req, res, next){
		const patientId = req.params.id;
		const props = req.body;
		var odontogramId = props._id;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Odontogramdb = db.model('odontogram', Odontogram.odontogramSchema);

		let prevOdontogram;

		Odontogramdb.findOne({ _id: odontogramId, patient_id: patientId })
			.then(item => {
				// stores previous document
				prevOdontogram = item;

				if(!item){
					Odontogramdb.create(props)
					.then(item => {
						res.send(item);
					})
					.catch(next);

				}else{
					item.update(props)
					.then(() => Odontogramdb.findOne({ _id: odontogramId, patient_id: patientId }))
					.then(item => {
						item.save();
						//AuditController.compare(prevOdontogram, props, odontogramId, updatedBy);
						res.send(item);
					})
					.catch(next);

				}
			})
			.catch(next);
	},
	get(req, res, next) {
		const odontogramId = req.params.id;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Odontogramdb = db.model('odontogram', Odontogram.odontogramSchema);

		Odontogramdb.findOne({_id: odontogramId})
			.then(item => res.send(item))
			.catch(next);
	},
	fetch(req, res, next) {
		const odontogramId = req.params.id;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Odontogramdb = db.model('odontogram', Odontogram.odontogramSchema);

		Odontogramdb.find({patient_id: odontogramId, active: true})
			.then(item => res.send(item))
			.catch(next);
	}
};