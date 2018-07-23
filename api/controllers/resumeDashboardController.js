const Data = require('../services/connect');

const resumeCards = require('../models/resumeCards');
const resumeSavedCards = require('../models/resumeSavedCards');

var edit = async(Resumedb, props, modelId) => {
  await Resumedb.findById({ _id: modelId })
    .then(model => (
      model.update(props)
        .then(model => model.save())
    ))
}

var create = async(Resumedb, props) => {
  var document;
  await Resumedb.create(props).then(card => document = card);
  return document;
}

var remove = async(Resumedb, modelId) => {
  await Resumedb.findById({ _id: modelId })
    .then(model => (
      model.remove()
        .then(model => model.save())
    ))
}

var get = async(Resumedb, user) => {
  var response;
  await Resumedb.find({user}).then(card => response = card);
  return response;
}

module.exports = {
	async update(req, res, next){
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Resumedb = db.model('card', resumeCards.cardSchema);

    const newCards = req.body;
    const oldCards = await get(Resumedb, req.session.user._id);
    await newCards.map(async (newAux) => {
      const { kind, layout, element, color } = newAux;
      if (newAux._id !== undefined) {
        oldCards.splice(oldCards.findIndex((old, index) => old._id == newAux._id), 1);
        await edit(Resumedb, { kind, layout, element, color }, newAux._id)
      }
      else
        return await create(Resumedb, { user: req.session.user._id, kind, layout, element, color });
    });
    await oldCards.map(async(item) => await remove(Resumedb, item._id));
    res.send(newCards);
  },
	async fetch(req, res, next) {
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
		let Resumedb = db.model('card', resumeCards.cardSchema);
		
		res.send(await get(Resumedb, req.session.user._id));
  },
  save(req, res, next) {
    var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
    let Resumedb = db.model('savedCard', resumeSavedCards.savedCardSchema);
    Resumedb.create({...req.body, user: req.session.user._id}).then(card => res.send(card));
  },
  getSaved(req, res, next) {
    var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
    let Resumedb = db.model('savedCard', resumeSavedCards.savedCardSchema);
    Resumedb.find({user: req.session.user._id, kind: req.body.kind}).then(list => res.send(list)).catch(next);
  },
  deleteSaved(req, res, next) {
    var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
    let Resumedb = db.model('savedCard', resumeSavedCards.savedCardSchema);
    Resumedb.findById({ _id: req.params.id })
      .then(model => (
        model.remove().then(model => model.save().then(() => res.send(true)))
      ))
  }
};