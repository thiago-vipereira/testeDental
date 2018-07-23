const CreditCard = require('../models/creditCard');

const AuditController = require('../controllers/audit_controller');

module.exports = {
	create(req, res, next){
		const props = req.body;

		CreditCard.create(props)
			.then(card => {
				AuditController.compare(card, props, card._id); 
				res.send(card);
			})
			.catch(next);
	},
	edit(req, res, next){
		const cardId = req.params.id;
		const props = req.body;
		let updatedBy;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		let prevCard;

		CreditCard.findById({ _id: cardId })
			.then(card => {
				// stores previous document
				prevCard = card;

				card.update(props)
					.then(() => CreditCard.findById({ _id: cardId }))
					.then(card => {
						card.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964

						// compares previous document with new props
						AuditController.compare(prevCard, props, cardId, updatedBy);

						res.send(card);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		const cardId = req.params.id;
		let updatedBy;
		let prevCard;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		CreditCard.findById({ _id: cardId })
			.then(card => {
				prevCard = card;

				card.update({ active: false })
					.then(() => CreditCard.findById({ _id: cardId }))
					.then(card => {
						card.save();

						// compares previous document with new props
						AuditController.compare(prevCard, { active: false }, cardId, updatedBy);

						res.send(card);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		const cardId = req.params.id;

		CreditCard.findById({_id: cardId})
			.then(card => res.send(card))
			.catch(next);
	}
};