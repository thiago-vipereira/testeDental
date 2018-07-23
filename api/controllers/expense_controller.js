const Expense = require('../models/expense');

const AuditController = require('../controllers/audit_controller');

module.exports = {
	create(req, res, next){
		const props = req.body;

		Expense.create(props)
			.then(expense => {
				AuditController.compare(expense, props, expense._id); 
				res.send(expense);
			})
			.catch(next);
	},
	edit(req, res, next){
		const expenseId = req.params.id;
		const props = req.body;
		let updatedBy;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		let prevExpense;

		Expense.findById({ _id: expenseId })
			.then(expense => {
				// stores previous document
				prevExpense = expense;

				expense.update(props)
					.then(() => Expense.findById({ _id: expenseId }))
					.then(expense => {
						expense.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964

						// compares previous document with new props
						AuditController.compare(prevExpense, props, expenseId, updatedBy);

						res.send(expense);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		const expenseId = req.params.id;
		let updatedBy;
		let prevExpense;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		Expense.findById({ _id: expenseId })
			.then(expense => {
				prevExpense = expense;

				expense.update({ active: false })
					.then(() => Expense.findById({ _id: expenseId }))
					.then(expense => {
						expense.save();

						// compares previous document with new props
						AuditController.compare(prevExpense, { active: false }, expenseId, updatedBy);

						res.send(expense);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		const expenseId = req.params.id;

		Expense.findById({_id: expenseId})
			.then(expense => res.send(expense))
			.catch(next);
	}
};