const Reminder = require('../models/reminder');

const AuditController = require('../controllers/audit_controller');

module.exports = {
	create(req, res, next){
		const props = req.body;

		Reminder.create(props)
			.then(reminder => {
				AuditController.compare(reminder, props, reminder._id); 
				res.send(reminder);
			})
			.catch(next);
	},
	edit(req, res, next){
		const reminderId = req.params.id;
		const props = req.body;
		let updatedBy;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		let prevReminder;

		Reminder.findById({ _id: reminderId })
			.then(reminder => {
				// stores previous document
				prevReminder = reminder;

				reminder.update(props)
					.then(() => Reminder.findById({ _id: reminderId }))
					.then(reminder => {
						reminder.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964

						// compares previous document with new props
						AuditController.compare(prevReminder, props, reminderId, updatedBy);

						res.send(reminder);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		const reminderId = req.params.id;
		let updatedBy;
		let prevReminder;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		Reminder.findById({ _id: reminderId })
			.then(reminder => {
				prevReminder = reminder;

				reminder.update({ active: false })
					.then(() => Reminder.findById({ _id: reminderId }))
					.then(reminder => {
						reminder.save();

						// compares previous document with new props
						AuditController.compare(prevReminder, { active: false }, reminderId, updatedBy);

						res.send(reminder);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		const reminderId = req.params.id;

		Reminder.findById({ _id: reminderId })
			.then(reminder => res.send(reminder))
			.catch(next);
	}
};