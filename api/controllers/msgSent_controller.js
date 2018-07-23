const MsgSent = require('../models/clinic');

const AuditController = require('../controllers/audit_controller');

module.exports = {
	create(req, res, next){
		const props = req.body;

		MsgSent.create(props)
			.then(msg => {
				AuditController.compare(msg, props, msg._id); 
				res.send(msg);
			})
			.catch(next);
	},
	edit(req, res, next){
		const msgId = req.params.id;
		const props = req.body;
		let updatedBy;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		let prevMsg;

		MsgSent.findById({ _id: msgId })
			.then(msg => {
				// stores previous document
				prevMsg = msg;

				msg.update(props)
					.then(() => MsgSent.findById({ _id: msgId }))
					.then(msg => {
						msg.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964

						// compares previous document with new props
						AuditController.compare(prevMsg, props, msgId, updatedBy);

						res.send(msg);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		const msgId = req.params.id;
		let updatedBy;
		let prevMsg;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		MsgSent.findById({ _id: msgId })
			.then(msg => {
				prevMsg = msg;

				msg.update({ active: false })
					.then(() => MsgSent.findById({ _id: msgId }))
					.then(msg => {
						msg.save();

						// compares previous document with new props
						AuditController.compare(prevMsg, { active: false }, msgId, updatedBy);

						res.send(msg);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		const msgId = req.params.id;

		MsgSent.findById({ _id: msgId })
			.then(msg => res.send(msg))
			.catch(next);
	}
};