const Installment = require('../models/installment');

const AuditController = require('../controllers/audit_controller');

module.exports = {
	create(req, res, next){
		const props = req.body;

		Installment.create(props)
			.then(installment => {
				AuditController.compare(installment, props, installment._id); 
				res.send(installment);
			})
			.catch(next);
	},
	edit(req, res, next){
		const installmentId = req.params.id;
		const props = req.body;
		let updatedBy;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		let prevInstallment;

		Installment.findById({ _id: installmentId })
			.then(installment => {
				// stores previous document
				prevInstallment = installment;

				installment.update(props)
					.then(() => Installment.findById({ _id: installmentId }))
					.then(installment => {
						installment.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964

						// compares previous document with new props
						AuditController.compare(prevInstallment, props, installmentId, updatedBy);

						res.send(installment);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		const installmentId = req.params.id;
		let updatedBy;
		let prevInstallment;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		Installment.findById({ _id: installmentId })
			.then(installment => {
				prevInstallment = installment;

				installment.update({ active: false })
					.then(() => Installment.findById({ _id: installmentId }))
					.then(installment => {
						installment.save();

						// compares previous document with new props
						AuditController.compare(prevInstallment, { active: false }, installmentId, updatedBy);

						res.send(installment);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		const installmentId = req.params.id;

		Installment.findById({ _id: installmentId })
			.then(installment => res.send(installment))
			.catch(next);
	}
};