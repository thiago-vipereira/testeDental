const Perio = require('../models/perio');
const Data = require('../services/connect');

module.exports = {
	edit(req, res, next){
		const perioId = req.params.id;
		const props = req.body;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Periodb = db.model('perio', Perio.perioSchema);

		let prevPerio;

		Periodb.findOne({ perio_id: perioId })
			.then(item => {
				// stores previous document
				prevPerio = item;

				if(!item){
					Periodb.create(props)
					.then(item => {
						res.send(item);
					})
					.catch(next);

				}else{
					item.update(props)
					.then(() => Periodb.findOne({ perio_id: perioId }))
					.then(item => {
						item.save();
						//AuditController.compare(prevPerio, props, perioId, updatedBy);
						res.send(item);
					})
					.catch(next);

				}
			})
			.catch(next);
	},
	get(req, res, next) {
		const perioId = req.params.id;

		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Periodb = db.model('perio', Perio.perioSchema);

		Periodb.findOne({perio_id: perioId})
			.then(item => res.send(item))
			.catch(next);
	}
};