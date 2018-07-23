const File = require('../models/file');

const AuditController = require('../controllers/audit_controller');

module.exports = {
	create(req, res, next){
		const props = req.body;

		File.create(props)
			.then(file => {
				AuditController.compare(file, props, file._id); 
				res.send(file);
			})
			.catch(next);
	},
	edit(req, res, next){
		const fileId = req.params.id;
		const props = req.body;
		let updatedBy;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		let prevFile;

		File.findById({ _id: fileId })
			.then(file => {
				// stores previous document
				prevFile = file;

				file.update(props)
					.then(() => File.findById({ _id: fileId }))
					.then(file => {
						file.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964

						// compares previous document with new props
						AuditController.compare(prevFile, props, fileId, updatedBy);

						res.send(file);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		const fileId = req.params.id;
		let updatedBy;
		let prevFile;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		File.findById({ _id: fileId })
			.then(file => {
				prevFile = file;

				file.update({ active: false })
					.then(() => File.findById({ _id: fileId }))
					.then(file => {
						file.save();

						// compares previous document with new props
						AuditController.compare(prevFile, { active: false }, fileId, updatedBy);

						res.send(file);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		const fileId = req.params.id;

		File.findById({_id: fileId})
			.then(file => res.send(file))
			.catch(next);
	}
};