const Prosthetic = require('../models/prosthetic');

const AuditController = require('../controllers/audit_controller');

module.exports = {
	create(req, res, next){
		const props = req.body;

		Prosthetic.create(props)
			.then(prosthetic => {
				AuditController.compare(prosthetic, props, prosthetic._id); 
				res.send(prosthetic);
			})
			.catch(next);
	},
	edit(req, res, next){
		const prostheticId = req.params.id;
		const props = req.body;
		let updatedBy;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		let prevProsthetic;

		Prosthetic.findById({ _id: prostheticId })
			.then(prosthetic => {
				// stores previous document
				prevProsthetic = prosthetic;

				prosthetic.update(props)
					.then(() => Prosthetic.findById({ _id: prostheticId }))
					.then(prosthetic => {
						prosthetic.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964

						// compares previous document with new props
						AuditController.compare(prevProsthetic, props, prostheticId, updatedBy);

						res.send(prosthetic);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		const prostheticId = req.params.id;
		let updatedBy;
		let prevProsthetic;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		Prosthetic.findById({ _id: prostheticId })
			.then(prosthetic => {
				prevProsthetic = prosthetic;

				prosthetic.update({ active: false })
					.then(() => Prosthetic.findById({ _id: prostheticId }))
					.then(prosthetic => {
						prosthetic.save();

						// compares previous document with new props
						AuditController.compare(prevProsthetic, { active: false }, prostheticId, updatedBy);

						res.send(prosthetic);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		const prostheticId = req.params.id;

		Prosthetic.findById({ _id: prostheticId })
			.then(prosthetic => res.send(prosthetic))
			.catch(next);
	}
};