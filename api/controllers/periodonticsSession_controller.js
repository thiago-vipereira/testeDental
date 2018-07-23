const PeriodonticsSession = require('../models/perio');
const Data = require('../services/connect');
const AuditController = require('../controllers/audit_controller');

module.exports = {


	fetch(req, res, next) {
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Periodb = db.model('perio', PeriodonticsSession.perioSchema);
		
		Periodb.find({ active: true })
			.then(list => {
				res.send(list);
			})
			.catch(next);
	},

	edit(req, res, next){
		//console.log(req.params)
		
		const props = req.body;
		const sessionId = props._id;
		let updatedBy;
		const patientId = req.params.id;
		//console.log(props);

		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Periodb = db.model('perio', PeriodonticsSession.perioSchema);

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		let prevPeriodontics;



		Periodb.findOne({ _id: sessionId, patient_id: patientId  })
			.then(session => {
				// stores previous document
				prevPeriodontics = session;

				if(!session){
					console.log(props)
					//console.log(props.dentes.superior);

					Periodb.create(props)
					.then(session => {
						//session.save();
						res.send(session);
					})
					.catch(next);

				}else{
					//console.log(props.dentes);
				session.update(props)
					.then(() => Periodb.findOne({ _id: sessionId, patient_id: patientId }))
					.then(session => {
						session.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964

						// compares previous document with new props
						//AuditController.compare(prevPeriodontics, props, sessionId, updatedBy);

						res.send(session);
					})
					.catch(next);
				}
			})
			.catch(next);
	},

	get(req, res, next) {
		
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Periodb = db.model('perio', PeriodonticsSession.perioSchema);

		const sessionId = req.params.id;
		
		Periodb.findById({ _id: sessionId })
			.then(session => res.send(session))
			.catch(next);
	}
};