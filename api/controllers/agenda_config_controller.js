const AgendaConfig = require('../models/agendaConfig');
const Data = require('../services/connect');

module.exports = {
	edit(req, res, next){
		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
	    let AgendaConfigdb = db.model('agendaConfig', AgendaConfig.agendaConfigSchema);

        const props = req.body;
        
        AgendaConfigdb.find()
        .then(item => {
            
            if(item.length > 0){

                item[0].update(props)
                .then(() => AgendaConfigdb.find() )
                .then(item => {
                    item[0].save();
                    res.send(item);
                })
                .catch(next);
            } else {

                AgendaConfigdb.create(props)
                .then(item => {
                    res.send(item);
                })
                .catch(next);
            }
            
        })
        .catch(next);
	},
	fetch(req, res, next){
		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
	    let AgendaConfigdb = db.model('agendaConfig', AgendaConfig.agendaConfigSchema);

        AgendaConfigdb.find()
        .then(item => {
            res.send(item);
        })
        .catch(next);
	},
};
