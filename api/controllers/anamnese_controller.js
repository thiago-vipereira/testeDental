const Anamnese = require('../models/anamnese');

const AuditController = require('../controllers/audit_controller');

module.exports = {
	create(req, res, next){
		const props = req.body;

		Anamnese.create(props)
			.then(anamnese => {
				AuditController.compare(anamnese, props, anamnese._id); 
				res.send(anamnese);
			})
			.catch(next);
	},
	edit(req, res, next){
		const anamneseId = req.params.id;
		const props = req.body;
		let updatedBy;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		let prevAnamnese;

		Anamnese.findById({ _id: anamneseId })
			.then(anamnese => {
				// stores previous document
				prevAnamnese = anamnese;

				anamnese.update(props)
					.then(() => Anamnese.findById({ _id: anamneseId }))
					.then(anamnese => {
						anamnese.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964

						// compares previous document with new props
						AuditController.compare(prevAnamnese, props, anamneseId, updatedBy);

						res.send(anamnese);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		const anamneseId = req.params.id;
		let updatedBy;
		let prevAnamnese;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		Anamnese.findById({ _id: anamneseId })
			.then(anamnese => {
				prevAnamnese = anamnese;

				anamnese.update({ active: false })
					.then(() => Anamnese.findById({ _id: anamneseId }))
					.then(anamnese => {
						anamnese.save();

						// compares previous document with new props
						AuditController.compare(prevAnamnese, { active: false }, anamneseId, updatedBy);

						res.send(anamnese);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		const anamneseId = req.params.id;

		Anamnese.findById({ _id: anamneseId })
			.then(anamnese => res.send(anamnese))
			.catch(next);
	}
};