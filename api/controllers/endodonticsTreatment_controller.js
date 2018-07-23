const EndodonticsTreatment = require('../models/endodonticsTreatment');

const AuditController = require('../controllers/audit_controller');

module.exports = {
	create(req, res, next){
		const props = req.body;

		EndodonticsTreatment.create(props)
			.then(treatment => {
				AuditController.compare(treatment, props, treatment._id); 
				res.send(treatment);
			})
			.catch(next);
	},
	edit(req, res, next){
		const endoTreatmentId = req.params.id;
		const props = req.body;
		let updatedBy;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		let prevTreatment;

		EndodonticsTreatment.findById({ _id: endoTreatmentId })
			.then(treatment => {
				// stores previous document
				prevTreatment = treatment;

				treatment.update(props)
					.then(() => EndodonticsTreatment.findById({ _id: endoTreatmentId }))
					.then(treatment => {
						treatment.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964

						// compares previous document with new props
						AuditController.compare(prevTreatment, props, endoTreatmentId, updatedBy);

						res.send(treatment);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		const endoTreatmentId = req.params.id;
		let updatedBy;
		let prevTreatment;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		EndodonticsTreatment.findById({ _id: endoTreatmentId })
			.then(treatment => {
				prevTreatment = treatment;

				treatment.update({ active: false })
					.then(() => EndodonticsTreatment.findById({ _id: endoTreatmentId }))
					.then(treatment => {
						treatment.save();

						// compares previous document with new props
						AuditController.compare(prevTreatment, { active: false }, endoTreatmentId, updatedBy);

						res.send(treatment);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		const endoTreatmentId = req.params.id;

		EndodonticsTreatment.findById({_id: endoTreatmentId})
			.then(treatment => res.send(treatment))
			.catch(next);
	}
};