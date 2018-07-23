const Appointment = require('../models/appointment');

const AuditController = require('../controllers/audit_controller');

module.exports = {
	create(req, res, next){
		const props = req.body;

		Appointment.create(props)
			.then(appointment => {
				AuditController.compare(appointment, props, appointment._id); 
				res.send(appointment);
			})
			.catch(next);
	},
	edit(req, res, next){
		const appointmentId = req.params.id;
		const props = req.body;
		let updatedBy;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		let prevAppointment;

		Appointment.findById({ _id: appointmentId })
			.then(appointment => {
				// stores previous document
				prevAppointment = appointment;

				appointment.update(props)
					.then(() => Appointment.findById({ _id: appointmentId }))
					.then(appointment => {
						appointment.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964

						// compares previous document with new props
						AuditController.compare(prevAppointment, props, appointmentId, updatedBy);

						res.send(appointment);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		const appointmentId = req.params.id;
		let updatedBy;
		let prevAppointment;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		Appointment.findById({ _id: appointmentId })
			.then(appointment => {
				prevAppointment = appointment;

				appointment.update({ active: false })
					.then(() => Appointment.findById({ _id: appointmentId }))
					.then(appointment => {
						appointment.save();

						// compares previous document with new props
						AuditController.compare(prevAppointment, { active: false }, appointmentId, updatedBy);

						res.send(appointment);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		const appointmentId = req.params.id;

		Appointment.findById({_id: appointmentId})
			.then(appointment => res.send(appointment))
			.catch(next);
	}
};