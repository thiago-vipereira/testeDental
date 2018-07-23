const Folder = require('../models/folder');

const AuditController = require('../controllers/audit_controller');

module.exports = {
	create(req, res, next){
		const props = req.body;

		Folder.create(props)
			.then(folder => {
				AuditController.compare(folder, props, folder._id); 
				res.send(folder);
			})
			.catch(next);
	},
	edit(req, res, next){
		const folderId = req.params.id;
		const props = req.body;
		let updatedBy;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		let prevFolder;

		Folder.findById({ _id: folderId })
			.then(folder => {
				// stores previous document
				prevFolder = folder;

				folder.update(props)
					.then(() => Folder.findById({ _id: folderId }))
					.then(folder => {
						folder.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964

						// compares previous document with new props
						AuditController.compare(prevFolder, props, folderId, updatedBy);

						res.send(folder);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		const folderId = req.params.id;
		let updatedBy;
		let prevFolder;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		Folder.findById({ _id: folderId })
			.then(folder => {
				prevFolder = folder;

				folder.update({ active: false })
					.then(() => Folder.findById({ _id: folderId }))
					.then(folder => {
						folder.save();

						// compares previous document with new props
						AuditController.compare(prevFolder, { active: false }, folderId, updatedBy);

						res.send(folder);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		const folderId = req.params.id;

		Folder.findById({_id: folderId})
			.then(folder => res.send(folder))
			.catch(next);
	}
};