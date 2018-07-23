const Dentist = require('../models/dentist');
const User = require('../models/user');
const Data = require('../services/connect');

const AuditController = require('../controllers/audit_controller');

module.exports = {
	getSchema(req, res, next) {
		res.send(Object.keys(Dentist.schema.tree).filter((item) => !["id", "_id", "__v", "clinic_id", "created_at", "updated_at", "updated_by"].includes(item)));
	},
	create(req, res, next){
		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
	    let Dentistdb = db.model('dentist', Dentist.dentistSchema);

		const props = req.body;

		Dentistdb.create(props)
			.then(dentist => {
				AuditController.compare(dentist, props, dentist._id);
				res.send(dentist);
			})
			.catch(next);
	},
	edit(req, res, next){
		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		const Dentistdb = db.model('dentist', Dentist.dentistSchema);

		const dentistId = req.params.id;
		const props = req.body;
		let updatedBy;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		let prevDentist;

		Dentistdb.findById({ _id: dentistId })
			.then(dentist => {
				// stores previous document
				prevDentist = dentist;

				dentist.update(props)
					.then(() => Dentistdb.findById({ _id: dentistId }))
					.then(dentist => {
						dentist.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964

						// compares previous document with new props
						AuditController.compare(prevDentist, props, dentistId, updatedBy);

						res.send(dentist);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		const dentistId = req.params.id;
		let updatedBy;
		let prevDentist;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
	    let Dentistdb = db.model('dentist', Dentist.dentistSchema);

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		Dentistdb.findById({ _id: dentistId })
			.then(dentist => {
				prevDentist = dentist;

				dentist.update({ active: false })
					.then(() => Dentistdb.findById({ _id: dentistId }))
					.then(dentist => {
						dentist.save();

						// compares previous document with new props
						//AuditController.compare(prevDentist, { active: false }, dentistId, updatedBy);

						res.send(dentist);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		const Dentistdb = db.model('dentist', Dentist.dentistSchema);

		const dentistId = req.params.id;

		Dentistdb.findById({_id: dentistId})
			.then(dentist => res.send(dentist))
			.catch(next);
	},
	bindUser(req, res, next) {
		const userId = req.body.id;
		const userClinic = req.body.clinic;

		Dentist.findOne({user_id: userId, clinic_id: userClinic })
			.then(dentist => {
				if(dentist == null){

					User.findById({_id: userId})
						.then(user => {
							res.send(user);
						});
				} else {
					res.send("User already binded");
				}
			})
			.catch(next);
	},
	fetchDentists(req, res, next) {
		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		const Dentistdb = db.model('dentist', Dentist.dentistSchema);

		const clinicId = req.session.clinic._id;

		Dentistdb.find({ clinic_id: clinicId, active: true })
			.then(dentists => {
				res.send(dentists);
			})
			.catch(next);
	}
};
