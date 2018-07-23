const Data = require('../services/connect');

const AnamneseModel = require('../models/anamneseModel');

const AuditController = require('../controllers/audit_controller');

module.exports = {
	create(req, res, next){
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Anamnesedb = db.model('anamneseModel', AnamneseModel.anamneseModelSchema);
		
		req.body.active = true;
		const props = req.body;

		Anamnesedb.create(props)
			.then(model => {
				// AuditController.compare(model, props, model._id); 
				// console.log(model);
				res.send(model);
			})
			.catch(next);
	},
	edit(req, res, next){
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Anamnesedb = db.model('anamneseModel', AnamneseModel.anamneseModelSchema);

		const modelId = req.params.id;
		const props = req.body;
		let updatedBy;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		let prevAnamneseModel;

		Anamnesedb.findById({ _id: modelId })
			.then(model => {
				// stores previous document
				prevAnamneseModel = model;

				model.update(props)
					.then(() => Anamnesedb.findById({ _id: modelId }))
					.then(model => {
						model.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964

						// compares previous document with new props
						AuditController.compare(prevAnamneseModel, props, modelId, updatedBy);

						res.send(model);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Anamnesedb = db.model('anamneseModel', AnamneseModel.anamneseModelSchema);

		const modelId = req.params.id;
		let updatedBy;
		let prevAnamneseModel;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		Anamnesedb.findById({ _id: modelId })
			.then(model => {
				prevAnamneseModel = model;

				model.update({ active: false })
					.then(() => Anamnesedb.findById({ _id: modelId }))
					.then(model => {
						model.save();

						// compares previous document with new props
						AuditController.compare(prevAnamneseModel, { active: false }, modelId, updatedBy);

						res.send(model);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Anamnesedb = db.model('anamneseModel', AnamneseModel.anamneseModelSchema);

		const modelId = req.params.id;

		Anamnesedb.findById({_id: modelId})
			.then(model => res.send(model))
			.catch(next);
	},
	fetch(req, res, next) {
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Anamnesedb = db.model('anamneseModel', AnamneseModel.anamneseModelSchema);
		
		Anamnesedb.find({ active: true })
			.then(list => {
				res.send(list);
			})
			.catch(next);
	}
};