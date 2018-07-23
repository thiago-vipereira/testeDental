const ProceduresList = require('../models/proceduresList');
const Data = require('../services/connect');

const AuditController = require('../controllers/audit_controller');

module.exports = {
	create(req, res, next){
		const props = req.body;

		props.clinic_id = req.session.clinic._id;
		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
	    let Proceduresdb = db.model('proceduresList', ProceduresList.proceduresListSchema);

		Proceduresdb.create(props)
			.then(list => {
				AuditController.compare(list, props, list._id); 
				res.send(list);
			})
			.catch(next);
	},
	edit(req, res, next){
		const listId = req.params.id;
		const props = req.body;
		var updatedBy;
		var prevProceduresList;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
	    var Proceduresdb = db.model('proceduresList', ProceduresList.proceduresListSchema);

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		Proceduresdb.findById({ _id: listId })
			.then(list => {

				prevProceduresList = JSON.parse(JSON.stringify(list));
				list.name = props.name;
				list.index = props.index;

				if(props.correction != null && props.correction > 0){

					list.groups.map(groupRet =>{

						groupRet.procedures.map(procedureRet =>{

							if(props.correction_select == '+'){

								procedureRet.price = procedureRet.price + (props.correction * procedureRet.price / 100);
							} else if(props.correction_select == '-'){

								procedureRet.price = procedureRet.price - (props.correction * procedureRet.price / 100);
							}
						});
					});
				}
				
				list.update(list)
					.then(() => Proceduresdb.findById({ _id: listId }))
					.then(list => {
						list.save();
						//AuditController.justDiff(req.session.user, "procedure", "proceduresList", "edit", prevProceduresList, list, db);
						res.send(list);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		const listId = req.params.id;
		let updatedBy;
		let prevProceduresList;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}
		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
	    let Proceduresdb = db.model('proceduresList', ProceduresList.proceduresListSchema);

		Proceduresdb.findById({ _id: listId })
			.then(list => {
				prevProceduresList = list;

				list.update({ active: false })
					.then(() => Proceduresdb.findById({ _id: listId }))
					.then(list => {
						list.save();

						// compares previous document with new props
						AuditController.compare(prevProceduresList, { active: false }, listId, updatedBy);
						res.send(list);
					});
			})
			.catch(next);
	},
	get(req, res, next) {

		const listId = req.params.id;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
	    let Proceduresdb = db.model('proceduresList', ProceduresList.proceduresListSchema);

		Proceduresdb.findById({ _id: listId })
			.then(list => res.send(list))
			.catch(next);
	},
	listByClinic(req, res, next) {
		const clinicId = req.session.clinic._id;
		
		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Proceduresdb = db.model('proceduresList', ProceduresList.proceduresListSchema);
		
		Proceduresdb.find({ clinic_id: clinicId, active: true })
			.then(list => {
				res.send(list);
			})
			.catch(next);
	},
	creatGroup(req, res, next){
		const listId = req.params.id;
		const props = req.body;
		let updatedBy;
		let prevProceduresList;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
	    let Proceduresdb = db.model('proceduresList', ProceduresList.proceduresListSchema);

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		Proceduresdb.findById({ _id: listId })
			.then(list => {

				prevProceduresList = list;
				list.groups.push(props.values);
				
				list.update(list)
					.then(() => Proceduresdb.findById({ _id: listId }))
					.then(list => {
						list.save(); 
						AuditController.compare(prevProceduresList, props, listId, updatedBy);

						res.send(list);
					})
					.catch(next);
			})
			.catch(next);
	},
	editGroup(req, res, next){
		const listId = req.params.id;
		const props = req.body;
		let updatedBy;
		var prevProceduresList;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
	    let Proceduresdb = db.model('proceduresList', ProceduresList.proceduresListSchema);

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		Proceduresdb.findById({ _id: listId })
			.then(list => {

				prevProceduresList = JSON.parse(JSON.stringify(list));

				list.groups.map(itens =>{
					if(itens.id == props.values.id){
						itens.name = props.values.name;
					}
				});

				
				list.update(list)
					.then(() => Proceduresdb.findById({ _id: listId }))
					.then(list => {
						var listNew = JSON.parse(JSON.stringify(list));
						list.save();
						AuditController.justDiff(req.session.user, "procedure", "proceduresList", "edit", prevProceduresList, listNew, db);
						//AuditController.justDiff(prevProceduresList, listNew);
						//AuditController.compare(prevProceduresList, listNew, listId, updatedBy);
						res.send(list);
					})
					.catch(next);
			})
			.catch(next);
	},
	deleteGroup(req, res, next){
		const listId = req.params.id;
		const groupId = req.params.idgroup;
		//const props = req.body;
		let updatedBy;
		let prevProceduresList;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
	    let Proceduresdb = db.model('proceduresList', ProceduresList.proceduresListSchema);

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		Proceduresdb.findById({ _id: listId })
			.then(list => {
				prevProceduresList = list;
				Proceduresdb.update({_id: listId, "groups._id": groupId}, { "groups.$.active": false})
					.then(() => Proceduresdb.findById({ _id: listId }))
					.then(list => {

						AuditController.compare(prevProceduresList, list, listId, updatedBy);
						res.send(list);
					})
					.catch(next);
			})
			.catch(next);
	},
	fetchGroups(req, res, next) {
		const listId = req.params.id;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Proceduresdb = db.model('proceduresList', ProceduresList.proceduresListSchema);

		Proceduresdb.findById({ _id: listId, active: true })
			.then( (list) => {
				res.send(list.groups);
			})
			.catch(next);
	},
	createProcedure(req, res, next){
		const listId = req.params.id;
		const groupId = req.body.group;

		const props = req.body;

		let updatedBy;
		let prevProceduresList;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
	    let Proceduresdb = db.model('proceduresList', ProceduresList.proceduresListSchema);

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		Proceduresdb.findById({ _id: listId })
			.then(list => {

				prevProceduresList = list;

				list.groups.map(itens =>{
					if(itens.id == groupId){
						itens.procedures.push(props.values);
					}
				});
				
				list.update(list)
					.then(() => Proceduresdb.findById({ _id: listId }))
					.then(list => {
						list.save(); 
						AuditController.compare(prevProceduresList, list, listId, updatedBy);

						res.send(list);
					})
					.catch(next);
			})
			.catch(next);
	},
	deleteProcedure(req, res, next){
		const listId = req.params.id;
		const groupId = req.params.idgroup;
		const procedureId = req.params.idprocedure;

		let updatedBy;
		let prevProceduresList;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
	    let Proceduresdb = db.model('proceduresList', ProceduresList.proceduresListSchema);

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		Proceduresdb.findById({ _id: listId })
			.then(list => {

				prevProceduresList = list;

				list.groups.map(groupRet =>{ 
					if(groupRet.id == groupId){ 

						groupRet.procedures.map(procedureRet =>{ 
							if(procedureRet.id == procedureId){ 
								procedureRet.active = false; 
							} 
						}); 
						
					} 
				}); 
				
				list.update(list)
					.then(() => Proceduresdb.findById({ _id: listId }))
					.then(list => {
						list.save(); 
						AuditController.compare(prevProceduresList, list, listId, updatedBy);

						res.send(list);
					})
					.catch(next);
			})
			.catch(next);
	},
	fetchProcedure(req, res, next) {
		const listId = req.params.id;
		const groupId = req.params.idgroup;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Proceduresdb = db.model('proceduresList', ProceduresList.proceduresListSchema);
		let procedureActive = [];

		Proceduresdb.findById({ _id: listId, active: true })
			.then( (list) => {

				list.groups.map(itens =>{
					if(itens.id == groupId){
						itens.procedures.map(proc =>{
							if(proc.active == true){
								procedureActive.push(proc);
							}
						});
						res.send(procedureActive);
					}
				});
			})
		.catch(next);
	},
	getProcedure(req, res, next){
		const listId = req.params.id;
		const groupId = req.params.idgroup;
		const procedureId = req.params.idprocedure;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
	    let Proceduresdb = db.model('proceduresList', ProceduresList.proceduresListSchema);

		Proceduresdb.findById({ _id: listId })
			.then(list => {

				list.groups.map(groupRet =>{

					if(groupRet.id == groupId){

						groupRet.procedures.map(procedureRet =>{
							if(procedureRet.id == procedureId){
								res.send(procedureRet);
							}
						});
					}
				});
			})
		.catch(next);
	},
	editProcedure(req, res, next){
		const listId = req.params.id;
		const groupId = req.params.idgroup;
		const procedureId = req.params.idprocedure;

		const groupEdited = req.body.value;

		let updatedBy;
		let prevProceduresList;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
	    const Proceduresdb = db.model('proceduresList', ProceduresList.proceduresListSchema);

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		Proceduresdb.findById({ _id: listId })
			.then(list => {

				prevProceduresList = JSON.parse(JSON.stringify(list));

				list.groups.map(groupRet =>{

					if(groupRet.id == groupId){

						groupRet.procedures.map(procedureRet =>{
							if(procedureRet.id == procedureId){
								procedureRet.code = groupEdited.code;
								procedureRet.description = groupEdited.description;
								procedureRet.procedure_type = groupEdited.procedure_type;
								procedureRet.color = groupEdited.color;
								procedureRet.price = groupEdited.price;
							}
						});
						
					}
				});	
				list.update(list)
					.then(() => Proceduresdb.findById({ _id: listId }))
					.then(list => {
						//(user, systemModule, model, actionType, prevDoc, newDoc, dataBase)
						
						list.save();
						AuditController.justDiff(req.session.user, listId, "procedure", "proceduresList", "edit", prevProceduresList, JSON.parse(JSON.stringify(list)), "edit procedure", db);
						//AuditController.compare(prevProceduresList, list, listId, updatedBy);

						res.send(list);
					})
					.catch(next);
			})
			.catch(next);
	}
};