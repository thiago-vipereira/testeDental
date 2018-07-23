const Vendor = require('../models/vendor');
const Data = require('../services/connect');
const AuditController = require('../controllers/audit_controller');

module.exports = {
	getSchema(req, res, next) {
		res.send(Object.keys(Vendor.schema.tree).filter((item) => !["id", "_id", "__v", "clinic_id", "created_at", "updated_at", "updated_by"].includes(item)));
	},
	create(req, res, next){
		const props = req.body;

		props.clinic_id = req.session.clinic._id;
		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Vendorsdb = db.model('vendor', Vendor.vendorSchema);

		Vendorsdb.create(props)
			.then(vendor => {
				AuditController.compare(vendor, props, vendor._id); 
				res.send(vendor);
			})
			.catch(next);
	},
	edit(req, res, next){
		const vendorId = req.params.id;
		const props = req.body;
		let updatedBy;
		let prevVendor;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Vendorsdb = db.model('vendor', Vendor.vendorSchema);

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}
		Vendorsdb.findById({ _id: vendorId })
			.then(vendor => {
				// stores previous document
				prevVendor = vendor;

				vendor.update(props)
					.then(() => Vendorsdb.findById({ _id: vendorId }))
					.then(vendor => {
						vendor.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964

						// compares previous document with new props
						AuditController.compare(prevVendor, props, vendorId, updatedBy);

						res.send(vendor);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		const vendorId = req.params.id;
		let updatedBy;
		let prevVendor;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
	    let Vendorsdb = db.model('vendor', Vendor.vendorSchema);

		Vendorsdb.findById({ _id: vendorId })
			.then(vendor => {
				prevVendor = vendor;

				vendor.update({ active: false })
					.then(() => Vendorsdb.findById({ _id: vendorId }))
					.then(vendor => {
						vendor.save();

						// compares previous document with new props
						AuditController.compare(prevVendor, { active: false }, vendorId, updatedBy);
						res.send(vendor);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		const vendorId = req.params.id;

		Vendor.findById({ _id: vendorId })
			.then(vendor => res.send(vendor))
			.catch(next);
	},
	listByClinic(req, res, next) {
		const clinicId = req.session.clinic._id;
	
		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Vendorsdb = db.model('vendor', Vendor.vendorSchema);
		
		Vendorsdb.find({ clinic_id: clinicId, active: true })
			.then(vendors => {
			
				res.send(vendors);
			})
			.catch(next);
	},
};