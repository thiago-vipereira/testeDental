const ProcedureModel = require('../models/procedureModel');

const AuditController = require('../controllers/audit_controller');

module.exports = {
	create(req, res, next){
		const props = req.body;

		ProcedureModel.create(props)
			.then(procedure => {
				AuditController.compare(procedure, props, procedure._id); 
				res.send(procedure);
			})
			.catch(next);
	},
	edit(req, res, next){
		const procedureModelId = req.params.id;
		const props = req.body;
		let updatedBy;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		let prevProcedureModel;

		ProcedureModel.findById({ _id: procedureModelId })
			.then(model => {
				// stores previous document
				prevProcedureModel = model;

				model.update(props)
					.then(() => ProcedureModel.findById({ _id: procedureModelId }))
					.then(model => {
						model.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964

						// compares previous document with new props
						AuditController.compare(prevProcedureModel, props, procedureModelId, updatedBy);

						res.send(model);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		const procedureModelId = req.params.id;
		let updatedBy;
		let prevProcedureModel;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		ProcedureModel.findById({ _id: procedureModelId })
			.then(model => {
				prevProcedureModel = model;

				model.update({ active: false })
					.then(() => ProcedureModel.findById({ _id: procedureModelId }))
					.then(model => {
						model.save();

						// compares previous document with new props
						AuditController.compare(prevProcedureModel, { active: false }, procedureModelId, updatedBy);

						res.send(model);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		const procedureModelId = req.params.id;

		ProcedureModel.findById({ _id: procedureModelId })
			.then(model => res.send(model))
			.catch(next);
	},
	listByGroup(req, res, next) {
		const groupId = req.params.id;

		ProcedureModel.find({ group_id: groupId })
			.then(procedure => res.send(procedure))
			.catch(next);
	}
};