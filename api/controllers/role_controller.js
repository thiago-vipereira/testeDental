const Role = require('../models/role');

const AuditController = require('../controllers/audit_controller');

module.exports = {
	create(req, res, next){
		const roleProps = req.body;

		Role.create(roleProps)
			.then(role => {
				AuditController.compare(role, roleProps, role._id); 
				res.send(role);
			})
			.catch(next);
	},
	edit(req, res, next){
		const roleId = req.params.id;
		const roleProps = req.body;
		let updatedBy;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		let prevRole;

		Role.findById({ _id: roleId })
			.then(role => {
				// stores previous document
				prevRole = role;

				role.update(roleProps)
					.then(() => Role.findById({ _id: roleId }))
					.then(role => {
						role.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964

						// compares previous document with new props
						AuditController.compare(prevRole, roleProps, roleId, updatedBy);

						res.send(role);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		const roleId = req.params.id;
		let updatedBy;
		let prevRole;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		Role.findById({ _id: roleId })
			.then(role => {
				prevRole = role;

				role.update({ active: false })
					.then(() => Role.findById({ _id: roleId }))
					.then(role => {
						role.save();

						// compares previous document with new props
						AuditController.compare(prevRole, { active: false }, roleId, updatedBy);

						res.send(role);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		const roleId = req.params.id;

		Role.findById({_id: roleId})
			.then(role => res.send(role))
			.catch(next);
	}
};