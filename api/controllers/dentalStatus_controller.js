const DentalStatus = require('../models/dentalStatus');
const Data = require('../services/connect');

module.exports = {
	edit(req, res, next){
		const dentalStatusId = req.params.id;
		const props = req.body;
		props.patient_id = dentalStatusId;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let DentalStatusdb = db.model('dentalStatus', DentalStatus.dentalStatusSchema);

		let prevDentalStatus;

		DentalStatusdb.findOne({ patient_id: dentalStatusId })
			.then(item => {
				// stores previous document
				prevDentalStatus = item;

				if(!item){
					DentalStatusdb.create(props)
					.then(item => {
						res.send(item);
					})
					.catch(next);

				}else{
					item.update(props)
					.then(() => DentalStatusdb.findOne({ patient_id: dentalStatusId }))
					.then(item => {
						item.save();
						//AuditController.compare(prevDentalStatus, props, dentalStatusId, updatedBy);
						res.send(item);
					})
					.catch(next);

				}
			})
			.catch(next);
	},
	get(req, res, next) {
		const dentalStatusId = req.params.id;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let DentalStatusdb = db.model('dentalStatus', DentalStatus.dentalStatusSchema);

		DentalStatusdb.findOne({patient_id: dentalStatusId})
			.then(item => res.send(item))
			.catch(next);
	}
};