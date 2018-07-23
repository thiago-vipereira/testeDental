const Data = require('../services/connect');

const AuditController = require('../controllers/audit_controller');

module.exports = {
  unmake(req, res, next) {
    const target = require(`../models/${req.params.db}`);
		var db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
    let Patientdb = db.model(req.params.db, target[req.params.db+'Schema']);
    for (var i=0; i<req.body.length; i++)
      Patientdb.update(req.body[i].find, {'$set': req.body[i].set}).then();
    res.send(true)    
    
	},
};
