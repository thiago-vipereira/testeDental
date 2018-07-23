const Procedure = require('../models/procedure');

const AuditController = require('../controllers/audit_controller');

module.exports = {
	create(req, res, next){
		const props = req.body;

		Procedure.create(props)
			.then(procedure => {
				AuditController.compare(procedure, props, procedure._id); 
				res.send(procedure);
			})
			.catch(next);
	},
	edit(req, res, next){
		const procedureId = req.params.id;
		const props = req.body;
		let updatedBy;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		let prevProcedure;

		Procedure.findById({ _id: procedureId })
			.then(procedure => {
				// stores previous document
				prevProcedure = procedure;

				procedure.update(props)
					.then(() => Procedure.findById({ _id: procedureId }))
					.then(procedure => {
						procedure.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964

						// compares previous document with new props
						AuditController.compare(prevProcedure, props, procedureId, updatedBy);

						res.send(procedure);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		const procedureId = req.params.id;
		let updatedBy;
		let prevProcedure;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		Procedure.findById({ _id: procedureId })
			.then(procedure => {
				prevProcedure = procedure;

				procedure.update({ active: false })
					.then(() => Procedure.findById({ _id: procedureId }))
					.then(procedure => {
						procedure.save();

						// compares previous document with new props
						AuditController.compare(prevProcedure, { active: false }, procedureId, updatedBy);

						res.send(procedure);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		const procedureId = req.params.id;

		Procedure.findById({ _id: procedureId })
			.then(procedure => res.send(procedure))
			.catch(next);
	}
};