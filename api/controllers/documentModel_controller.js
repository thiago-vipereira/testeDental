const DocumentModel = require('../models/documentModel');
const Data = require('../services/connect');

const AuditController = require('../controllers/audit_controller');

module.exports = {
	create(req, res, next){
		const clinicId = req.session.clinic._id;
		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Modeldb = db.model('documentModel', DocumentModel.documentModelSchema);

		req.body.active = true;
		const props = req.body;
		
		Modeldb.create(props)
			.then(model => {
				AuditController.compare(model, props, model._id); 
				res.send(model);
			})
			.catch(next);
	},
	edit(req, res, next){
		const clinicId = req.session.clinic._id;
		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Modeldb = db.model('documentModel', DocumentModel.documentModelSchema);

		const modelId = req.params.id;
		const props = req.body;
		let updatedBy;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		let prevModel;

		Modeldb.findById({ _id: modelId })
			.then(model => {
				// stores previous document
				prevModel = model;

				model.update(props)
					.then(() => Modeldb.findById({ _id: modelId }))
					.then(model => {
						model.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964

						// compares previous document with new props
						AuditController.compare(prevModel, props, modelId, updatedBy);

						res.send(model);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		const clinicId = req.session.clinic._id;
		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Modeldb = db.model('documentModel', DocumentModel.documentModelSchema);
		
		const modelId = req.params.id;
		let updatedBy;
		let prevModel;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		Modeldb.findById({ _id: modelId })
			.then(model => {
				prevModel = model;

				model.update({ active: false })
					.then(() => Modeldb.findById({ _id: modelId }))
					.then(model => {
						model.save();

						// compares previous document with new props
						AuditController.compare(prevModel, { active: false }, modelId, updatedBy);

						res.send(model);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		const clinicId = req.session.clinic._id;
		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Modeldb = db.model('documentModel', DocumentModel.documentModelSchema);

		const modelId = req.params.id;

		Modeldb.findById({_id: modelId})
			.then(model => res.send(model))
			.catch(next);
	},
	fetch(req, res, next) {
		const clinicId = req.session.clinic._id;
		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Modeldb = db.model('documentModel', DocumentModel.documentModelSchema);
		var filter = { active: true };
		if (req.body.documentType)
			filter.type = req.body.documentType
		
		Modeldb.find(filter)
			.then(list => {
				res.send(list);
			})
			.catch(next);
	}
};