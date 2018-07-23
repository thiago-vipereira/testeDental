const _ = require('lodash');
const mongoose = require('mongoose');
const Clinic = require('../models/clinic');
const User = require('../models/user');
const Data = require('../services/connect');

var upload_image = require("./image_upload.js");
var fs = require('fs');

const AuditController = require('../controllers/audit_controller');

module.exports = {
	create(req, res, next){

		var db = Data.getDatabaseConnection('teste');
	    var Clinic1 = db.model('clinic', Clinic.clinicSchema);
	
		const clinicProps = req.body;
		let clinicId;

		Clinic1.create(clinicProps)
			.then(clinic => {
				clinicId = clinic._id;
				AuditController.create(clinic, clinicProps, clinicId);
				res.send(clinic);
			})
			.catch(next);
	},
	edit(req, res, next){
		const clinicDB = req.params.db; 
		const clinicId = req.params.id;

		const db = Data.getDatabaseConnection(clinicDB); 
		let Clinicdb = db.model('clinic', Clinic.clinicSchema); 

		const clinicProps = req.body;
		let updatedBy;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		let prevClinic;

		Clinicdb.findById({ _id: clinicId })
			.then(clinic => {
				// stores previous document
				//prevClinic = clinic;
				clinic.update(clinicProps)
					.then(() => Clinicdb.findById({ _id: clinicId }))
					.then(clinic => {
						clinic.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964

						// compares previous document with new props
						//AuditController.compare(prevClinic, clinicProps, clinicId, updatedBy);

						res.send(clinic);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		const clinicId = req.params.id;
		let updatedBy;
		let prevClinic;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		Clinic.findById({ _id: clinicId })
			.then(clinic => {
				prevClinic = clinic;

				clinic.update({ active: false })
					.then(() => Clinic.findById({ _id: clinicId }))
					.then(clinic => {
						clinic.save();

						// compares previous document with new props
						AuditController.compare(prevClinic, { active: false }, clinicId, updatedBy);

						res.send(clinic);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		const clinicDB = req.params.db;
		const clinicId = req.params.id;

		const db = Data.getDatabaseConnection(clinicDB);
	    let Clinicdb = db.model('clinic', Clinic.clinicSchema);

		Clinicdb.findById({_id: clinicId})
			.then(clinic => res.send(clinic))
			.catch(next);
	},
	getClinics(req, res, next) {
		const clinicIds = req.body.clinics;
		let arrayIds = [];

		_.map(clinicIds, clinicId => {
			arrayIds.push(mongoose.Types.ObjectId(clinicId));
		});

		Clinic.find({ _id: { $in: arrayIds } })
			.select({ _id: true, name: true, active: true, logo_url: true })
			.then(clinics => res.send(clinics))
			.catch(next);
	},
	nameValidate(req, res, next){
		const clinicName = req.body.name;
		Clinic.findOne({name: clinicName})
			.then(clinic => {
				if(clinic){
					res.status(500).send("clinic already exists")
				}else{
					res.send(clinicName)
				}
			})
			.catch(next);
	},
	subscription(req, res, next){

		const subscriptionProps = req.body;

		subscriptionProps.clinic.clinic_data = Math.random().toString(36).substr(2, 6);

		var db = Data.getDatabaseConnection(subscriptionProps.clinic.clinic_data);
	    let Clinicdb = db.model('clinic', Clinic.clinicSchema);

		Clinicdb.create(subscriptionProps.clinic)
			.then(clinic => {
				const userProps = subscriptionProps.user;

				if(userProps.id != null){
					Clinicdb.findByIdAndUpdate({_id: clinic.id}, { $push: { "users": userProps.id }} )
					.then(clinic => {

						User.findByIdAndUpdate({_id: userProps.id}, { $push: { "clinics": { 'clinic_id': clinic.id, 'clinic_data': clinic.clinic_data, 'name': clinic.name }} } )
						.then();
					});

				}else{
					userProps.password = User().generateHash(userProps.password);

					User.create(userProps)
						.then(user => {

							Clinicdb.findByIdAndUpdate({_id: clinic.id}, { $push: { "users": user.id }} )
							.then(clinic => {

								User.findByIdAndUpdate({_id: user.id}, { $push: { "clinics": { 'clinic_id': clinic.id, 'clinic_data': clinic.clinic_data, 'name': clinic.name } }} )
								.then();
							});
						});
				}
				res.send("clinic and user created")
			})
			.catch(next);
	},
	imageCreate(req, res, next){
    upload_image(req, [{param: false, text:'upload_image'}, {param: false, text: req.session.clinic._id}, {param: false, text: 'gallery'}], function(err, data) {
      if (err)
				return res.status(500).send(JSON.stringify(err));

			const clinic = req.session.clinic;
			
			var db = Data.getDatabaseConnection(clinic.clinic_data);
			let Clinicdb = db.model('clinic', Clinic.clinicSchema); 
	
			let updatedBy;
			if (req.session.user)
				updatedBy = req.session.user;

			let prevClinic;
	
			Clinicdb.findById({ _id: clinic._id })
				.then(clinic => {
					prevClinic = clinic;
					var link = '/api/image/clinic/'+data.randomName;
					clinic.update({ $push: { gallery: { url: link, filename: data.randomName, tag: updatedBy.name } } })
						.then(() => Clinicdb.findById({ _id: clinic._id }))
						.then(clinic => {
							clinic.save();
							// AuditController.compare(prevClinic, clinicProps, clinic._id, updatedBy);
							res.send({link});
						})
						.catch(next);
				})
				.catch(next);
    });
  },
	imageDelete(req, res, next) {
		const clinic = req.session.clinic;
		
		var db = Data.getDatabaseConnection(clinic.clinic_data);
		let Clinicdb = db.model('clinic', Clinic.clinicSchema); 

		let updatedBy;
		if (req.session.user)
			updatedBy = req.session.user;

		let prevClinic;

		Clinicdb.findById({ _id: clinic._id })
			.then(clinic => {
				prevClinic = clinic;
				clinic.update({ $pull: { gallery: { _id: req.body._id } } })
					.then(() => Clinicdb.findById({ _id: clinic._id }))
					.then(clinic => {
						clinic.save();
						fs.unlinkSync(`./upload_image/${req.session.clinic._id}/gallery/${req.body.filename}`);
					})
					.catch(next);
			})
			.catch(next);
		res.send(req.body);
	},
	imageGet(req, res, next) {
    // download_image(req.params.name, () => {
    //   res.send(true);
    // })
    var path = `./upload_image/${req.session.clinic._id}/gallery/${req.params.name}`;
    if (fs.existsSync(path)) {
      var img = fs.readFileSync(path);
      res.writeHead(200, {'Content-Type': 'image/gif' });
      res.end(img, 'binary');
    }
    else 
      res.status(404).send(`File ${req.params.name} not found`);
	},
	imageFetch(req, res, next) {
		const clinic = req.session.clinic;

		var db = Data.getDatabaseConnection(clinic.clinic_data);
		let Clinicdb = db.model('clinic', Clinic.clinicSchema); 

		Clinicdb.findById({ _id: clinic._id })
			.then(clinic => res.send(clinic.gallery))
			.catch(next);
	}
};
