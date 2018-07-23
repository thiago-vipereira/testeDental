const Material = require('../models/material');
const Data = require('../services/connect');
const AuditController = require('../controllers/audit_controller');

module.exports = {
	create(req, res, next){
		const props = req.body;
		console.log(props.name);
		props.clinic_id = req.session.clinic._id;
		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Materialsdb = db.model('material', Material.materialSchema);
	
		Materialsdb.create(props)
			.then(material => {
				AuditController.compare(material, props, material._id); 
				res.send(material);
			})
			.catch(next);
	},

 	addStorage(req, res, next){
		const props = req.body;
	
		const materialId = req.params.id;
		props.clinic_id = req.session.clinic._id;
		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Materialsdb = db.model('material', Material.materialSchema);
		let prevMaterial;
		let updatedBy;
		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}
		Materialsdb.findById({ _id: materialId })
			.then(material => {
				prevMaterial = material;
				console.log(material);
				material.update(
					{ $push: { "storage": { "registry_type": props.registry_type, "quantity": props.quantity, "date": props.date } } }
				)
					.then(() => Materialsdb.findById({ _id: materialId }))
					.then(material => {
						material.update(
							
							{ $set: { "quantity": props.registry_type == 'in' ? (parseInt(material.quantity) + parseInt(props.quantity)) : (parseInt(material.quantity) - parseInt(props.quantity)) } }
						)
						.then(() => Materialsdb.findById({ _id: materialId }))
						.then(material => {
							material.save();
						
							AuditController.compare(prevMaterial, props, materialId, updatedBy);
	
							res.send(material);
						})

					})
					.catch(next);
			})
			.catch(next);
		
	}, 
	edit(req, res, next){
		const materialId = req.params.id;
		console.log(materialId);
		const props = req.body;
		let updatedBy;
		let prevMaterial;
		//props.clinic_id = req.session.clinic._id;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Materialsdb = db.model('material', Material.materialSchema);

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

	 

		Materialsdb.findById({ _id: materialId })
			.then(material => {
				// stores previous document
				prevMaterial = material;

				material.update(props)
					.then(() => Materialsdb.findById({ _id: materialId }))
					.then(material => {
						material.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964

						// compares previous document with new props
						AuditController.compare(prevMaterial, props, materialId, updatedBy);

						res.send(material);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		const materialId = req.params.id;
		let updatedBy;
		let prevMaterial;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
	    let Materialsdb = db.model('material', Material.materialSchema);


		Materialsdb.findById({ _id: materialId })
			.then(material => {
				prevMaterial = material;

				material.update({ active: false })
					.then(() => Materialsdb.findById({ _id: materialId }))
					.then(material => {
						material.save();

						// compares previous document with new props
						AuditController.compare(prevMaterial, { active: false }, materialId, updatedBy);

						res.send(material);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		const materialId = req.params.id;

		Material.findById({ _id: materialId })
			.then(material => res.send(material))
			.catch(next);
	},
	listByClinic(req, res, next) {
		const props = req.body;
		//const clinicId = '5a807507663a61023086534d';
		const clinicId = req.session.clinic._id;
	    //console.log('5a807507663a61023086534d');
		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Materialsdb = db.model('material', Material.materialSchema);

	

		
		Materialsdb.find({  clinic_id: clinicId, active: true })
			.then(material => {
				//console.log(material);
				res.send(material);
			})
			.catch(next);
	},
	listByDate(req, res, next){
		console.log(req.body);
		const props = req.body;
		const clinicId = req.session.clinic._id;
		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Materialsdb = db.model('material', Material.materialSchema);
		var startDate;
		var endDate;

		if(props.startDate && props.endDate){
				var startDate = new Date(props.startDate);
				startDate.setHours(0, 0);
				var endDate= new Date(props.endDate);
				endDate.setHours(23, 59);
		}else{
			startDate = new Date();
			startDate.setDate(1);
			endDate = new Date();
			endDate.setDate(31);
		}
		if(req.body.limit){
		const limit = req.body.limit;
		}
		if(req.body.page){
		const page = req.body.page;
		}
		let order = {};
		let condition = {};
		
 	if (req.body.registry_type){
		condition['storage.registry_type'] = { $regex: req.body.registry_type.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&'), $options: 'i' };
	 }
	if (req.body.material){
		condition['storage.material'] = { $regex: req.body.material.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&'), $options: 'i' };
	}
	if (req.body.description){
		condition['storage.quantity'] = { $regex: req.body.quantity.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&'), $options: 'i' }; 
	}
	if (req.body.column){
		order[req.body.column] = req.body.order ? 1 : -1; 
	}else{
		order = {"storage.date": 1 }
	}

	Materialsdb.aggregate([ { $unwind : '$storage' },
	{$match: {"storage.date": {$gte: startDate, $lte: endDate}, "active": true, $and: [condition]}},
	
	])
	 .sort(order)	


		.then(list => {
			
					 res.send({length:Object.keys(list).length, list:list}) 
		}) 
	 
	

		/* Materialsdb.aggregate([
			{$match: {"storage.date": {$gte: startDate, $lte: endDate}, "active": true, $and: [condition]}},
			{$project: {
				storage: {$filter:{
					input: "$storage",
					as: "storage",
					cond: { $and: [ 
						{ $gte: ["$$storage.date", startDate] },
						{ $lte: ["$$storage.date", endDate] },		
					]}
				}},
				"name": "$name",
				"quantity": "$quantity",
				"min": "$min",
				"max": "$max",
				"clinic_id": "$clinic_id",
				"active": "$active",
				"_id": "$_id",
				"vendor_id": "$vendor_id"
			}}
		]) */


							

										
			.catch(next);

	},
};