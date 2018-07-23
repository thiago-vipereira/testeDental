const Estimate = require('../models/estimate');

const AuditController = require('../controllers/audit_controller');

module.exports = {
	create(req, res, next){
		const props = req.body;

		Estimate.create(props)
			.then(estimate => {
				AuditController.compare(estimate, props, estimate._id); 
				res.send(estimate);
			})
			.catch(next);
	},
	edit(req, res, next){
		const estimateId = req.params.id;
		const props = req.body;
		let updatedBy;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		let prevEstimate;

		Estimate.findById({ _id: estimateId })
			.then(estimate => {
				// stores previous document
				prevEstimate = estimate;

				estimate.update(props)
					.then(() => Estimate.findById({ _id: estimateId }))
					.then(estimate => {
						estimate.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964

						// compares previous document with new props
						AuditController.compare(prevEstimate, props, estimateId, updatedBy);

						res.send(estimate);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		const estimateId = req.params.id;
		let updatedBy;
		let prevEstimate;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		Estimate.findById({ _id: estimateId })
			.then(estimate => {
				prevEstimate = estimate;

				estimate.update({ active: false })
					.then(() => Estimate.findById({ _id: estimateId }))
					.then(estimate => {
						estimate.save();

						// compares previous document with new props
						AuditController.compare(prevEstimate, { active: false }, estimateId, updatedBy);

						res.send(estimate);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		const estimateId = req.params.id;

		Estimate.findById({_id: estimateId})
			.then(estimate => res.send(estimate))
			.catch(next);
	}
};