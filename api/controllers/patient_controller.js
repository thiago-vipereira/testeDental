var fs = require("fs");
const _ = require('lodash');
var sha1 = require("sha1");
var formidable = require('formidable');
const Data = require('../services/connect');

const Patient = require('../models/patient');

const AuditController = require('../controllers/audit_controller');

var upload_image = require("./image_upload.js");

module.exports = {
	getSchema(req, res, next) {
		res.send(Object.keys(Patient.schema.tree).filter((item) => !["id", "_id", "__v", "clinic_id", "created_at", "updated_at", "updated_by"].includes(item)));
	},
	create(req, res, next){
		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);
		
		var props = req.body;
		Patientdb.findOne({name: props.name , telephones:{ $elemMatch: { value: props.telephones[0].value}} })
			.then( patient => {
				if(patient == null){
					if (!props.registry) {
						Patientdb.count().then( patients => {
							
							if(patients > 0){
								Patientdb.find().sort({registry:-1}).limit(1).then( patient => {
									props.registry = patient[0].registry+1;
									Patientdb.create(props)
									.then(patient => {
										//AuditController.compare('created', props, patient._id);
										AuditController.justDiff(req.session.user, patient._id, "Patient", "patient", "create", [], patient, "description", db);
										res.send(patient);
									})
									.catch(next);
								});
							}else{
								props.registry = 1;
								Patientdb.create(props)
								.then(patient => {
									//AuditController.compare('created', props, patient._id);
									AuditController.justDiff(req.session.user, patient._id, "Patient", "patient", "create", [], patient, "description", db);
									res.send(patient);
								})
								.catch(next);
							}

						});
					}
					else {
						Patientdb.create(props)
							.then(patient => {
								//AuditController.compare('created', props, patient._id);
								AuditController.justDiff(req.session.user, patient._id, "Patient", "patient", "create", [], patient, "description", db);
								res.send(patient);
							})
							.catch(next);
					}
				} else {
					res.send("patient already exists");
				}
			})
			.catch(next);
	},
	list(req, res, next){
		var db;
		let Patientdb;
		const props = req.body;
		for (var i=0; i<props.length; i++) {
			db = Data.getDatabaseConnection('t5h3a1');  
			Patientdb = db.model('patient', Patient.patientSchema);
			Patientdb.create(props[i])
			.then(patient => {
				AuditController.compare('created', props, patient._id); 
				res.send(patient);
			})
			.catch(next);
		}
	},
	edit(req, res, next){
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);

		const patientId = req.params.id;
		const props = req.body;
		let updatedBy;

		if (req.session.passport.user) {
			updatedBy = req.session.passport.user;
			// updatedBy = req.body.updated_by;
		}
		
		let prevPatient;

		Patientdb.findById({ _id: patientId })
			.then(patient => {
				// stores previous document
				prevPatient = JSON.parse(JSON.stringify(patient));

				patient.update(props)
					.then(() => Patientdb.findById({ _id: patientId }))
					.then(patient => {
						patient.save();

						//AuditController.compare(prevPatient, props, patientId, updatedBy);
						AuditController.justDiff(req.session.user, patient._id, "Patient", "patient", "edit", prevPatient, JSON.parse(JSON.stringify(patient)), "description created", db);

						res.send(patient);
					})
					.catch(next);
			})
			.catch(next);
	},
	editArray(req, res, next){
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);

		const props = req.body.props;
		let updatedBy;

		if (req.session.passport.user)
			updatedBy = req.session.passport.user;
		
		let prevPatient;
		var last = 0;
		for (var k=0; k<req.body.array.length; k++) {
			const patientId = req.body.array[k];
			Patientdb.findById({ _id: patientId })
				.then(patient => {
					// stores previous document
					prevPatient = patient;
					patient.update(props)
						.then(() => Patientdb.findById({ _id: patientId }))
						.then(patient => {
							patient.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964
							
							// compares previous document with new props
							AuditController.compare(prevPatient, props, patientId, updatedBy);
							last++;
							if (last == req.body.array.length)
								res.send(req.body.array);
						})
						.catch(next);
				})
				.catch(next);
		}
		req.setTimeout(0);
	},
	delete(req, res, next){
		const patientId = req.params.id;
		let updatedBy;
		let prevPatient;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		Patient.findById({ _id: patientId })
			.then(patient => {
				prevPatient = patient;

				patient.update({ active: false })
					.then(() => Patient.findById({ _id: patientId }))
					.then(patient => {
						patient.save();

						// compares previous document with new props
						AuditController.compare(prevPatient, { active: false }, patientId, updatedBy);

						res.send(patient);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		const patientId = req.params.id;

		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);

		Patientdb.findById({ _id: patientId })
			.then(patient => res.send(patient))
			.catch(next);
	},
	search(req, res, next) {
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
	    let Patientdb = db.model('patient', Patient.patientSchema);
	    
		// const clinicId = req.body.clinic;
		const query = req.body.value;
		let fields = [];

		var valueNum = query.match(/[0-9]+/g);
		valueNum = valueNum ? valueNum.join('') : '';
		var valueEmail = query.match(/@{1}/g);
		
		if ( query.length <= 3 && valueNum.length == query.length ){
			fields.push({ '$where': "/"+query+".*/.test(this.registry)" });

		} else if ( query.length > 3 && valueNum.length == query.length  && !valueEmail){
			fields.push({ '$where': "/"+query+".*/.test(this.registry)" });
			fields.push({ 'telephones.0.value': { '$regex': query, '$options': 'i' } });

		} else if ( query.length >= 3 && valueNum.length != query.length  && !valueEmail){
			fields.push({ 'name': { '$regex': query, '$options': 'i' } });
			fields.push({ 'telephones.0.value': { '$regex': query, '$options': 'i' } });

		} else if (valueEmail) {
			fields.push({ 'email': { '$regex': query, '$options': 'i' } });

		} else {
			fields.push({ 'name': { '$regex': query, '$options': 'i' } });
		}

		Patientdb
			.find({	$and: [{ $or : fields }, { active: true }] })
			.sort({ name: 1 })
			.limit(6)
			.then(patients => res.send(patients))
			.catch(next);
	},
	filter (req, res, next) {
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);
		
		let condition = [];
		for (var criterion in req.body) {
			var inside = {};
			switch (req.body[criterion].type) {
				case 'string':
					if (req.body[criterion].regex == 's')
						req.body[criterion].content = '^' + req.body[criterion].content;
					else if (req.body[criterion].regex == 'e')
						req.body[criterion].content += '$';
					inside[criterion] = { $regex: req.body[criterion].content.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&'), $options: 'i' };
					condition.push(inside);
					break;
				case 'date':
				if ((req.body[criterion].since && req.body[criterion].since.length == 2) || (req.body[criterion].to && req.body[criterion].to.length == 2)) {
						var day1 = req.body[criterion].since?parseInt(req.body[criterion].since, 10):1,
						day2 = req.body[criterion].to?parseInt(req.body[criterion].to, 10):31,
						dayCondition = day1<=day2?'$and':'$or', expr = {[dayCondition]: []};
						expr[dayCondition].push({ $gte: [{ $dayOfMonth: '$'+criterion }, day1] });
						expr[dayCondition].push({ $lte: [{ $dayOfMonth: '$'+criterion }, day2] });
						condition.push({$expr: expr});
					}
					else if ((req.body[criterion].since && req.body[criterion].since.length == 5) || (req.body[criterion].to && req.body[criterion].to.length == 5)) {
						var day1, day2, parts, expr;
						if (req.body[criterion].since) {
							parts = req.body[criterion].since.split("/");
							day1 = parseInt(parts[0], 10);
							month1 = parseInt(parts[1], 10);
						}
						else {
							day1 = 1;
							month1 = 1;
						}
						if (req.body[criterion].to) {
							parts = req.body[criterion].to.split("/");
							day2 = parseInt(parts[0], 10);
							month2 = parseInt(parts[1], 10);
						}
						else {
							day2 = 31;
							month2 = 12;
						}
						if (month1 === month2)
							expr = {$and: [{ $eq: [{ $month: '$'+criterion }, month1] }, { $gte: [{ $dayOfMonth: '$'+criterion }, day1] }, { $lte: [{ $dayOfMonth: '$'+criterion }, day2] }]};
						else {
							var or = [{$and: [{ $eq: [{ $month: '$'+criterion }, month1] }, { $gte: [{ $dayOfMonth: '$'+criterion }, day1] }]}];
							var diff = (month2-month1+12)%12;
							if (diff === 2)
								or.push({ $eq: [{ $month: '$'+criterion }, (month1+1)%12] })
							else if (diff !== 1) {
								if (month2>month1)
									or.push({$and: [{ $gt: [{ $month: '$'+criterion }, month1] }, { $lt: [{ $month: '$'+criterion }, month2] }]})
								else
									or.push({$or: [ { $gt: [{ $month: '$'+criterion }, month1] }, { $and: [{ $lt: [{ $month: '$'+criterion }, month2] }, { $gte: [{ $month: '$'+criterion }, 1] }] } ]})
							}
							or.push({$and: [{ $eq: [{ $month: '$'+criterion }, month2] }, { $gte: [{ $dayOfMonth: '$'+criterion }, 1] }, { $lte: [{ $dayOfMonth: '$'+criterion }, day2] }]});
							expr = {$or: or};
						}
						condition.push({$expr: expr});
					}
					else {
						inside[criterion] = {};
						if (req.body[criterion].since) {
							var dt = req.body[criterion].since.split("/");
							inside[criterion].$gte = new Date (dt[1] + "/" + dt[0] + "/" + dt[2]);
						}
						if (req.body[criterion].to) {
							var dt2 = req.body[criterion].to.split("/");
							inside[criterion].$lte = new Date (dt2[1] + "/" + dt2[0] + "/" + dt2[2]);
						}
						condition.push(inside);
					}
					break;
				case 'int':
					inside[criterion] = {};
					if (req.body[criterion].since)
						inside[criterion].$gte = parseInt(req.body[criterion].since);
					if (req.body[criterion].to)
						inside[criterion].$lte = parseInt(req.body[criterion].to);
					condition.push(inside);
					break;
				default:
					inside[criterion] = req.body[criterion].content;
					condition.push(inside);
					break;
			}
		}
		Patientdb
			.find(condition.length>0?{
				$and: condition
			}:{})
			.sort({name: 1})
			.then(patients => res.send(patients))
			.catch(next);
	},
	paginate(req, res, next) {
		
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);
		
		const limit = req.body.limit;
		const page = req.body.page;
		let order = {};
		let condition = {};
		if (req.body.active !== '')
			condition = {'active': req.body.active};
		if (req.body.cad !== '')
			condition['$where'] = "/"+req.body.cad+".*/.test(this.registry)";
			// condition['registry'] = { $regex: req.body.cad, $options: 'i' };
		if (req.body.name !== '')
			condition['name'] = { $regex: req.body.name.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&'), $options: 'i' };
		if (req.body.email !== '')
			condition['email'] = { $regex: req.body.email.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&'), $options: 'i' };
		if (req.body.tel !== '')
			condition['telephones.value'] = { $regex: req.body.tel.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&'), $options: 'i' };
		if (req.body.cpf !== '')
			condition['cpf'] = { $regex: req.body.cpf.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&'), $options: 'i' };
		if (req.body.column !== '')
			order[req.body.column] = req.body.order ? 1 : -1;
		else
			order = { name: 1 }
		Patientdb
			.find({
				$and: [condition]
			})
			.sort(order)
			.skip(limit*(page-1))
			.limit(limit)
			.then(patients => {Patientdb.find({$and: [condition]}).count((e, count) => res.send({length: count, array: patients}))})
			.catch(next);
	},
	selectAll(req, res, next) {
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);
		let condition = {};
		if (req.body.active !== '')
			condition = {'active': req.body.active};
		if (req.body.cad !== '')
			condition['$where'] = "/"+req.body.cad+".*/.test(this.registry)";
		if (req.body.name !== '')
			condition['name'] = { $regex: req.body.name.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&'), $options: 'i' };
		if (req.body.email !== '')
			condition['email'] = { $regex: req.body.email.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&'), $options: 'i' };
		if (req.body.tel !== '')
			condition['telephones.value'] = { $regex: req.body.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&').tel, $options: 'i' };
		if (req.body.cpf !== '')
			condition['cpf'] = { $regex: req.body.cpf.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&'), $options: 'i' };
		Patientdb
			.find(
				{$and: [condition]}
				,{'_id': 1, 'email': 1, 'name': 1}
			)
			// .distinct("_id")
			.then(patients => res.send(patients))
			.catch(next);
	},
	agendaValidation(req, res, next) {

		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);
		var patientExists;
		var name = req.body.name;
		var telephone = req.body.telephone;
		
		Patientdb.find({ name: {$regex : name.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&') , $options: 'i'} })
		.then(list => {
			list.map(item => {
				item.telephones.map(tel =>{
					if(tel.value == telephone){
						patientExists = item;
					}
				});
			})
			if(patientExists){
				res.send(patientExists);
			}else{
				res.send(null);
			}

		}).catch(next);
	},
	// createFile (req, res, next) {
	// 	var paths = [
	// 		{param: false, text:'upload_image'},
	// 		{param: false, text: req.session.clinic._id},
	// 		{param: false, text: 'patient'},
	// 		{param: false, text: req.params.id},
	// 		{param: false, text: 'files'},
	// 		{param: true, key: 'dir'}
	// 	];
	// 	upload_image(req, paths, function(err, data) {
  //     		if (err)
	// 			return res.status(500).send(JSON.stringify(err));

	// 		var dir = `./upload_image/${req.session.clinic._id}/patient/${req.params.id}/files/${data.params.dir}${data.randomName}`;
			
	// 		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
	// 		let Patientdb = db.model('patient', Patient.patientSchema);
	
	// 		Patientdb.findById({ _id: req.params.id })
	// 			.then(patient => {
	// 				var link = '/api/file/patient/'+data.randomName,
	// 				filoInfos = { url: link, dir, hash: data.randomName, filename: data.params.name, tag: req.session.user.name }
	// 				patient.update({
	// 					$push: {
	// 						gallery: filoInfos,
	// 						['files.'+data.params.path+'content']: filoInfos
	// 					}
	// 				})
	// 					.then(patient => {
	// 						res.send({link});
	// 					})
	// 					.catch(next);
	// 			})
	// 			.catch(next);
  //   	});
	// },
	createFile (req, res, next) {
		var form = new formidable.IncomingForm(), params = {}, files = [];
		form.parse(req);
		form.on('field', (name, value) => params[name] = value);
		form.on('fileBegin', (name, file) => {
			var randomName = sha1(new Date().getTime()) + "." + file.name.split(".").pop();
			file.path = `./upload_image/${req.session.clinic._id}/patient/${req.params.id}/files/${params.dir}${randomName}`;
			file.name = randomName;
		});
		form.on('file', (name, file) => {
			var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
			let Patientdb = db.model('patient', Patient.patientSchema);
	
			Patientdb.findById({ _id: req.params.id })
				.then(patient => {
					var url = `/api/file/patient/${req.params.id}/${file.name}`,
					dir = `./upload_image/${req.session.clinic._id}/patient/${req.params.id}/files/${params.dir}${file.name}`,
					filoInfos = { url, dir, hash: file.name, filename: name, ext: file.name.split(".").pop(), tag: req.session.user.name };
					patient.update({
						$push: {
							gallery: filoInfos,
							['files.'+params.path+'content']: filoInfos
						}
					})
						.then(patient => {
							files.push(filoInfos);
							if (files.length === parseInt(params.qtd))
								res.send(files)
						})
						.catch(next);
				})
				.catch(next);
		});
	},
	deleteFile (req, res, next) {
		
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);

		Patientdb.findById({ _id: req.params.id })
			.then(patient => {
				patient.update({
					$pull: {
						gallery: {hash: req.body.hash},
						['files'+req.body.path+'content']: {hash: req.body.hash}
					}
				})
					.then(patient => {
						fs.unlinkSync(`./upload_image/${req.session.clinic._id}/patient/${req.params.id}/files/${req.body.dir}${req.body.hash}`);
						res.send(true);
					})
					.catch(next);
			})
			.catch(next);
	},
	renameFile (req, res, next) {
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);
		Patientdb.update(
			{ _id: req.params.id, [`files${req.body.path}content.hash`]: req.body.hash },
			{ $set: {[`files${req.body.path}content.$.filename`]: req.body.newName}	}
		)
			.then(() => {
				Patientdb.update(
					{ _id: req.params.id, 'gallery.hash': req.body.hash },
					{ $set: {'gallery.$.filename': req.body.newName} }
				)
					.then(() => {
						console.log('aksjdklasdjlasjd')
						res.send(true)
					})
			})
			.catch(next);
		// { _id: req.params.id },
		// { $set: {[`files${req.body.path}content.$[filesFilter].filename`]: req.body.newName, 'gallery.$[galleryFilter].filename': req.body.newName}	},
		// { arrayFilters: [{ 'filesFilter.hash': req.body.hash }, { 'galleryFilter.hash': req.body.hash }] }
	},
	getFile(req, res, next) {

		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);

		Patientdb.findById({ _id: req.params.id })
		.then(patient => {
			img = patient.gallery.find((item) => item.hash === req.params.hash);
			// var path = `./upload_image/${req.session.clinic._id}/patient/${req.params.id}/files/${img.dir}/${img.name}`;
			if (fs.existsSync(img.dir)) {
				// var img = fs.readFileSync(img.dir);
				// res.writeHead(200, {'Content-Type': 'image/gif' });
				// res.end(img, 'binary');
				var parentPath = __dirname.split('\\');
				parentPath.splice(-2, 2);
				res.sendFile(parentPath.join('\\')+img.dir.slice(1).replace(/\//g, '\\'));
			}
			else 
				res.status(404).send(`File ${req.params.hash} not found`);
		})
		.catch(next);
    
	},
	createDirectory (req, res, next) {
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);
		Patientdb.findById({ _id: req.params.id })
		.then(patient => {
			patient.update({$set : { [`files${req.body.path}${req.body.name}`]: {content: []} }})
				.then(patient => {
					var dir = `upload_image/${req.session.clinic._id}/patient/${req.params.id}/files/${req.body.dir}${req.body.name}`.split('/');
					route = '/';
					dir.map((item) => {
						route += item;
						if (!fs.existsSync('.'+route))
							fs.mkdirSync('.'+route);
						route += '/';
					});
					res.send(true);
				})
				.catch(next);
		})
		.catch(next);
	},
	renameDirectory (req, res, next) {
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);
		Patientdb.findById({ _id: req.params.id })
		.then(patient => {
			// patient.update({
				// $rename: { [`files${req.body.path}${req.body.name}`]: `files${req.body.path}${req.body.newName}` },
				// $pull: {gallery: {hash: req.body.hash}}
			// }, {multi: true})
			// 	.then(ptnt => {
					var dir = `./upload_image/${req.session.clinic._id}/patient/${req.params.id}/files${req.body.dir}`;
					fs.renameSync(dir+req.body.name, dir+req.body.newName);
					var files = {...patient._doc.files}, copy = files;
					var folders = req.body.dir.split('/');
					folders.splice(-1, 1);
					folders.splice(0, 1);
					folders.map((item) => copy = copy[item]);
					copy[req.body.newName] = {...copy[req.body.name]}
					delete copy[req.body.name];
					var recursivePaths = (folder) => {
						Object.entries(folder).map((item) => {
							if (item[0] === 'content')
								folder.content = item[1].map((itm) => {
									return {...itm, dir: itm.dir.replace(dir+req.body.name, dir+req.body.newName)}
								});
							else
								recursivePaths(folder[item[0]]);
						});
					};
					recursivePaths(copy);

					var gallery = [];
					patient._doc.gallery.map((obj) => gallery.push({...obj._doc, dir: obj._doc.dir.replace(dir+req.body.name, dir+req.body.newName)}));

					patient.update({ gallery, files })
						.then(() => res.send({ gallery, files }));
				})
				.catch(next);
		// })
		// .catch(next);
	},
	fetchDirectory (req, res, next) {
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);

		Patientdb.findById({ _id: req.params.id })
		.then(patient => {
			// var dir = req.body.dir.split('/');
			// var files = patient.files;
			// dir.map((item) => files = files[item]);
			res.send(patient.files);
		})
		.catch(next);
	},
	deleteDirectory (req, res, next) {
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);

		var dir = `./upload_image/${req.session.clinic._id}/patient/${req.params.id}/files${req.body.dir}${req.body.name}`;
		Patientdb.findById({ _id: req.params.id })
		.then(patient => {
			patient.update(
				{
					$unset : {
						[`files${req.body.path}${req.body.name}`]: ""
					},
					$pull: {
						gallery: { dir: { $regex: '^'+dir, $options: 'i' } } 
					}
				},
				{ multi: true }
			)
				.then(ptnt => {
					var copyPatient  = patient;
					var deleteFolderRecursive = (path) => {
						if (fs.existsSync(path)) {
							fs.readdirSync(path).forEach((file, index) => {
								var curPath = path + "/" + file;
								if (fs.lstatSync(curPath).isDirectory())
									deleteFolderRecursive(curPath);
								else
									fs.unlinkSync(curPath);
							});
							fs.rmdirSync(path);
						}
					};
					deleteFolderRecursive(dir);
					res.send(true);
				})
				.catch(next);
		})
		.catch(next);
	},
	fetchAnamnesis (req, res, next) {
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);

		Patientdb.findById({ _id: req.params.id })
			.then(patient => res.send(patient._doc.anamnesis))
			.catch(next);
	},
	getAnamnesis (req, res, next) {
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);
		Patientdb.findById({ _id: req.params.id })
			.then(patient => {
				var anamnesisId = req.params.anamnesisId;
				res.send(patient._doc.anamnesis.find((item) => item._id == anamnesisId));
			})
			.catch(next);
	},
	createAnamnesis (req, res, next) {
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);

		Patientdb.findById({ _id: req.params.id })
			.then(patient => {
				patient.update({ $push: { anamnesis: req.body }})
					.then(() => res.send(true))
					.catch(next);
			})
			.catch(next);
			// Patientdb.findById({ _id: req.params.id }).then(patient => res.send(true))
	},
	fetchDocument (req, res, next) {
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);

		Patientdb.findById({ _id: req.params.id })
			.then(patient => res.send(patient._doc.documentModel.filter((item) => item.type === req.body.documentType )))
			.catch(next);
	},
	getDocument (req, res, next) {
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);
		Patientdb.findById({ _id: req.params.id })
			.then(patient => {
				var documentId = req.params.documentId;
				res.send(patient._doc.documentModel.find((item) => item._id == documentId));
			})
			.catch(next);
	},
	createDocument (req, res, next) {
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Patientdb = db.model('patient', Patient.patientSchema);

		Patientdb.findById({ _id: req.params.id })
			.then(patient => {
				patient.update({ $push: { documentModel: req.body }})
					.then(() => res.send(true))
					.catch(next);
			})
			.catch(next);
	}
};

// {'registry': { $regex: cad, $options: 'i' }},
// {'name': { $regex: name, $options: 'i' }},
// {'email': { $regex: email, $options: 'i' }},
// {'telephones.value': { $regex: tel, $options: 'i' }},
// {'cpf': { $regex: cpf, $options: 'i' }}