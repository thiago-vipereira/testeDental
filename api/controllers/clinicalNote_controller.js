const ClinicalNote = require('../models/clinicalNote');

module.exports = {
	create(req, res, next){
		const props = req.body;

		ClinicalNote.create(props)
			.then(note => {
				AuditController.compare(note, props, note._id); 
				res.send(note);
			})
			.catch(next);
	},
	edit(req, res, next){
		const clinicalNoteId = req.params.id;
		const props = req.body;
		let updatedBy;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		let prevClinicalNote;

		ClinicalNote.findById({ _id: clinicalNoteId })
			.then(note => {
				// stores previous document
				prevClinicalNote = note;

				note.update(props)
					.then(() => ClinicalNote.findById({ _id: clinicalNoteId }))
					.then(note => {
						note.save(); // trick to fire the 'save' hook in the schema ---> https://github.com/Automattic/mongoose/issues/964

						// compares previous document with new props
						AuditController.compare(prevClinicalNote, props, clinicalNoteId, updatedBy);

						res.send(note);
					})
					.catch(next);
			})
			.catch(next);
	},
	delete(req, res, next){
		const clinicalNoteId = req.params.id;
		let updatedBy;
		let prevClinicalNote;

		if (req.body.updated_by) {
			updatedBy = req.body.updated_by;
		}

		ClinicalNote.findById({ _id: clinicalNoteId })
			.then(note => {
				prevClinicalNote = note;

				note.update({ active: false })
					.then(() => ClinicalNote.findById({ _id: clinicalNoteId }))
					.then(note => {
						note.save();

						// compares previous document with new props
						AuditController.compare(prevClinicalNote, { active: false }, clinicalNoteId, updatedBy);

						res.send(note);
					});
			})
			.catch(next);
	},
	get(req, res, next) {
		const clinicalNoteId = req.params.id;

		ClinicalNote.findById({_id: clinicalNoteId})
			.then(note => res.send(note))
			.catch(next);
	}
};