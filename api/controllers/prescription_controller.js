const Prescription = require('../models/prescription');

const AuditController = require('../controllers/audit_controller');

module.exports = {
	create(req, res, next){
		const props = req.body;

		Prescription.create(props)
			.then(prescription => {
				AuditController.compare(prescription, props, prescription._id); 
				res.send(prescription);
			})
			.catch(next);
	},
	edit(req, res, next){
		const prescriptionId = req.params.id;
		const props = req.body;
		let updatedBy;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		let prevPrescription;

		Prescription.findById({ _id: prescriptionId })
			.then(prescription => {
				// stores previous document
				prevPrescription = prescription;

				prescription.update(props)
					.then(() => Prescription.findById({ _id: prescriptionId }))
					.then(prescription => {
						prescription.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964

						// compares previous document with new props
						AuditController.compare(prevPrescription, props, prescriptionId, updatedBy);

						res.send(prescription);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		const prescriptionId = req.params.id;
		let updatedBy;
		let prevPrescription;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		Prescription.findById({ _id: prescriptionId })
			.then(prescription => {
				prevPrescription = prescription;

				prescription.update({ active: false })
					.then(() => Prescription.findById({ _id: prescriptionId }))
					.then(prescription => {
						prescription.save();

						// compares previous document with new props
						AuditController.compare(prevPrescription, { active: false }, prescriptionId, updatedBy);

						res.send(prescription);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		const prescriptionId = req.params.id;

		Prescription.findById({ _id: prescriptionId })
			.then(prescription => res.send(prescription))
			.catch(next);
	}
};