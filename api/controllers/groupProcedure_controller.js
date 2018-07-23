const GroupProcedure = require('../models/groupProcedure');

const AuditController = require('../controllers/audit_controller');

module.exports = {
	create(req, res, next){
		const props = req.body;

		GroupProcedure.create(props)
			.then(group => {
				AuditController.compare(group, props, group._id); 
				res.send(group);
			})
			.catch(next);
	},
	edit(req, res, next){
		const groupId = req.params.id;
		const props = req.body;
		let updatedBy;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		let prevGroup;

		GroupProcedure.findById({ _id: groupId })
			.then(group => {
				// stores previous document
				prevGroup = group;

				group.update(props)
					.then(() => GroupProcedure.findById({ _id: groupId }))
					.then(group => {
						group.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964

						// compares previous document with new props
						AuditController.compare(prevGroup, props, groupId, updatedBy);

						res.send(group);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		const groupId = req.params.id;
		let updatedBy;
		let prevGroup;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		GroupProcedure.findById({ _id: groupId })
			.then(group => {
				prevGroup = group;

				group.update({ active: false })
					.then(() => GroupProcedure.findById({ _id: groupId }))
					.then(group => {
						group.save();

						// compares previous document with new props
						AuditController.compare(prevGroup, { active: false }, groupId, updatedBy);

						res.send(group);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		const groupId = req.params.id;

		GroupProcedure.findById({ _id: groupId })
			.then(group => res.send(group))
			.catch(next);
	},
	listByList(req, res, next) {
		const listId = req.params.id;

		GroupProcedure.find({ list_id: listId })
			.then(group => res.send(group))
			.catch(next);
	}
};