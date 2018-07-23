const Diff = require ('just-diff');
const DiffApply = require('just-diff-apply');
const _ = require('lodash');

const Audit = require('../models/audit');
const Data = require('../services/connect');

const Patient = require('../models/patient');
const ProceduresList = require('../models/proceduresList');

const isFunction = function(obj) {
	return {}.toString.apply(obj) === '[object Function]';
};

const selectModel = function(model, db){
	
	switch(model) {
		case 'patient':
			return db.model('patient', Patient.patientSchema);
		case 'proceduresList':
			return db.model('proceduresList', ProceduresList.proceduresListSchema);
		default:
			return null;
	}
};

module.exports = {
	create(newDoc, props, clinicId, updatedBy) {
		let auditRecord = {
			action: 'created',
			clinic: clinicId,
			document: newDoc._id,
			date: new Date(),
			diff: props
		};

		if (updatedBy) {
			auditRecord.user = updatedBy;
		}

		Audit.create(auditRecord)
				.then(audit => {})
				.catch(err => console.log(err));
	},
	fetch(req, res, next) {
		const props = req.body;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Auditdb = db.model('audit', Audit.auditSchema);

		var startDate;
		var endDate;

		if(props.startDate && props.endDate){
			var startDate = new Date(props.startDate);
			startDate.setHours(0, 0);
			var endDate= new Date(props.endDate);
			endDate.setHours(23, 59);
		}else{
			startDate = new Date();
			startDate.setHours(0, 0);
			endDate= new Date();
			endDate.setHours(23, 59);
		}
		
		const limit = req.body.limit;
		const page = req.body.page;
		let order = {};
		let condition = {};
		//if (req.body.date !== '')
		//	condition['$where'] = "/"+req.body.cad+".*/.test(this.registry)";
			// condition['registry'] = { $regex: req.body.cad, $options: 'i' };
		if (req.body.user !== '')
			condition['user'] = { $regex: req.body.user.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&'), $options: 'i' };
		if (req.body.module !== '')
			condition['module'] = { $regex: req.body.module.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&'), $options: 'i' };
		if (req.body.description !== '')
			condition['description'] = { $regex: req.body.description.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&'), $options: 'i' };
		if (req.body.column !== '')
			order[req.body.column] = req.body.order ? 1 : -1;
		else
			order = { user: 1 }

		Auditdb.find({ date: { $gte: startDate, $lte: endDate }, $and: [condition] }).sort(order)
			.skip(limit*(page-1))
			.limit(limit)
			.then(list => {Auditdb.find({ date: { $gte: startDate, $lte: endDate }, $and: [condition] })
			.count((e, count) => 
						res.send({length: count, list: list})
				)}
			)
			.catch(next);
	},
	justDiff(user, itemId, systemModule, model, actionType, prevDoc, newDoc, description, dataBase){

		/*usuario
		data
		modulo dentro do sistema
		model qual banco procurar
		tipo alteração
		alterações [antes, depois]*/

		var date = new Date();
		var before = Diff.diff(newDoc, prevDoc);
		var after =  Diff.diff(prevDoc, newDoc);

		var audit = {
			user: user.name,// quem mexeu
			date: new Date(),// quando mexeu
			item_id: itemId,// no que mexeu
			module: systemModule,//onde mexeu
			model: model,//model item
			type: actionType,//que tipo de mexida
			modification: [before, after],//o que mexeu
			description: description
		};

		const Auditdb = dataBase.model('audit', Audit.auditSchema);
		
		Auditdb.create(audit)
		.then(list => {
			list.save();
		})
	},
	justDiffApply(req, res, next){
		
		/*usuario
		data
		modulo dentro do sistema
		model qual banco procurar
		tipo alteração
		alterações [antes, depois]*/

		//adicionar o id do objeto para pesquisa na tabela audit, senão não tem como acha-lo

		const props = req.body;
		const auditId = req.params.id;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Auditdb = db.model('audit', Audit.auditSchema);

		Auditdb.findById({ _id: auditId })
		.then(audit => {

			let modelDB = selectModel(audit._doc.model, db);

			modelDB.findById({ _id: audit._doc.item_id })
			.then(item => {

				let prevItem = JSON.parse(JSON.stringify(item));

				//item.update(audit._doc.modification[1])
				//	.then(() => modelDB.findById({ _id: audit._doc.item_id }))
					//.then(item => {

						item = DiffApply.diffApply(item, audit._doc.modification[0]);

						item.save();
						module.exports.justDiff(req.session.user, audit._doc.item_id, audit._doc.module, audit._doc.model, "reverse", prevItem, JSON.parse(JSON.stringify(item)), "reverse audit", db);

						res.send(item);
					//})
					//.catch(next);
			})
			.catch(next);

		})
	},
	compare(prevDoc, props, clinicId, updatedBy) {
		let auditRecord = {
			document: prevDoc._id,
			date: new Date(),
			diff: {}
		};

		if (updatedBy) {
			auditRecord.user = updatedBy;
		}

		// if it is deleting the document, there is no need to check the diffs
		if (props.active === false) {
			auditRecord.action = 'deleted';
			auditRecord.diff = props;

		} else {
			// loops through the previous document
			for (let key in prevDoc) {
				if (isFunction(prevDoc[key]) || prevDoc[key] === props[key] || key === 'updated_by' || key === 'clinic_audit') {
					continue;
				}
				// if the key exists in the next document...
				if (props[key]) {
					// it stores the previous value and the next value in the diff object as an array
					// the first item in the array is the PREVIOUS VALUE
					// the second item in the array is the NEXT VALUE
					auditRecord.diff[key] = [prevDoc[key], props[key]];
				}

			}

			// loops through the next document
			for (let key in props) {
				// if the key is not in the diff obj, it means it is a new attribute
				if (prevDoc[key] === props[key] || auditRecord.diff[key] || key === 'updated_by' || key === 'clinic_audit') {
					continue;
				}
				
				auditRecord.diff[key] = [undefined, props[key]];
			}
		}

		// if clinicId is not String it is an array of clinics and the system should save an audit for each clinic
		if (clinicId.constructor === Array) {
			for (let i = 0; i < clinicId.length; i++) {
				auditRecord.clinic = clinicId[i];

				Audit.create(auditRecord)
					.then(audit => {})
					.catch(err => console.log(err));
			}
		} else {
			auditRecord.clinic = clinicId;
			
			Audit.create(auditRecord)
					.then(audit => {})
					.catch(err => console.log(err));
		}
		
	}
};