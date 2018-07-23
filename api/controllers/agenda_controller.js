const Data = require('../services/connect');

const Agenda = require('../models/agenda');
const Patient = require('../models/patient');
const AuditController = require('../controllers/audit_controller');

module.exports = {
    create(req, res){

        const db = Data.getDatabaseConnection(req.data);
        let Agendadb = db.model('agenda', Agenda.agendaSchema);
        let Patientdb = db.model('patient', Patient.patientSchema);

        var schedule = req.schedule;
        var createNew = req.createNew;

        if(createNew){
            Patientdb.count().then( patients => {
                Patientdb.find().sort({registry:-1}).limit(1).then( patient => {
                    
                    Patientdb.create({name: schedule.patient, telephones:[{ name: 'Principal', value: schedule.telephone }], registry: patient[0].registry+1 })
                    .then(patient => {

                        //AuditController.justDiff(req.session.user, patient._id, "Patient", "patient", "create", [], patient, "description", db);

                        schedule.id_patient = patient._id;
                        Agendadb.create(schedule)
                        .then( () => {
                            res.emit('client'+req.data , { data: "update" });
                            res.broadcast.emit('client'+req.data , { data: "update" });
                        })
                    })
                });
            });
        }else{
            Agendadb.create(schedule)
                .then( () => {
                    res.emit('client'+req.data , { data: "update" });
                    res.broadcast.emit('client'+req.data , { data: "update" });
                })
        }
	},
	fetch(req, res) {

        const db = Data.getDatabaseConnection(req.data);
		let Agendadb = db.model('agenda', Agenda.agendaSchema);

		var startDate;
        var endDate;
        var condition = [];

		if(req.date && req.view != 'agenda'){
			startDate = new Date(req.date);
            startDate.setHours(0, 0, 0, 0);
            startDate.setDate(1);

			endDate= new Date(req.date);
            endDate.setHours(23, 59);
            endDate.setMonth( endDate.getMonth()+1 );
            endDate.setDate(-1); 
		}else if(req.view != 'agenda') {
			startDate = new Date();
            startDate.setHours(0, 0, 0, 0);
            startDate.setDate(1);
            
			endDate= new Date();
            endDate.setHours(23, 59);
            endDate.setMonth( endDate.getMonth()+1 );
            endDate.setDate(-1); 
        }else{
            startDate = new Date(req.date);
            startDate.setHours(0, 0, 0, 0);

			endDate= new Date(req.date);
            endDate.setHours(23, 59);
            endDate.setMonth( endDate.getMonth()+1 );
        }

        condition.push( {active: true} );

        if(req.patient){
            condition.push( {id_patient: req.patient} );
        }else{
            condition.push( {start: { $gte: startDate, $lte: endDate }} );
        }

        if(req.user && req.user.length > 0){
            var users = []
            req.user.map(item => {
                users.push({id_user: item.value});
            })

            condition.push( {$or: users } );
        }

        Agendadb.find({ $and: condition }).sort( { start: 1 } )
			.then(list => {
                res.emit('client'+req.data , { data: list });
            })
    },
    update(req, res){
        
        const db = Data.getDatabaseConnection(req.data);
        let Agendadb = db.model('agenda', Agenda.agendaSchema);
 
        var event = req.move.event;
        event.start = req.move.start;
        event.end = req.move.end;

        Agendadb.findById({ _id: event._id })
        .then(item => {
            item.update(event)
            .then( () => Agendadb.findById({ _id: event._id }))
                .then(item => {
                    
                    item.save().then(() => {
                        res.emit('client'+req.data , { data: "update" });
                        res.broadcast.emit('client'+req.data , { data: "update" });
                    });
                })

        })
    },
    checkDentistSchedule(req, res, next){
		const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
        let Agendadb = db.model('agenda', Agenda.agendaSchema);
        
        const props = req.body;
        var idDentist = props.id;
        var startEvent = props.start;
        var endEvent = props.end;

        Agendadb.find({ id_user: idDentist,  $or: [ {start: { $gte: startEvent, $lte: endEvent }}, {end: { $gte: startEvent, $lte: endEvent }}, {$and:[ {start: { $lte: startEvent}}, {end: { $gte: endEvent }} ]} ]  })
        .then(item => {
            res.send(item);
        })
        .catch(next);
    },
	filter (req, res, next) {
        const db = Data.getDatabaseConnection(req.session.clinic.clinic_data);
        let Agendadb = db.model('agenda', Agenda.agendaSchema);
		
		let condition = [];
		for (var criterion in req.body) {
			var inside = {};
			switch (req.body[criterion].type) {
				case 'string':
					if (req.body[criterion].regex == 's')
						req.body[criterion].content = '^' + req.body[criterion].content;
					else if (req.body[criterion].regex == 'e')
						req.body[criterion].content += '$';
					inside[criterion] = { $regex: req.body[criterion].content.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&'), $options: 'i' };
					condition.push(inside);
					break;
				case 'date':
					if (req.body[criterion].since.length == 2) {
						var day1 = req.body[criterion].since?parseInt(req.body[criterion].since, 10):1,
						day2 = req.body[criterion].to?parseInt(req.body[criterion].to, 10):31;
						or = [];
						for (var i=day1; i!==(day2==31?1:day2+1); i++) {
							inside = {};
							inside[criterion] = { $regex: '-'+('0' + i).slice(-2)+'T', $options: 'i' };
							or.push(inside);
							if (i==31)
								i=0;
						}
						condition.push({$or: or});
					}
					else if (req.body[criterion].since.length == 5) {
						var parts1 = req.body[criterion].since.split("/"), parts2 = req.body[criterion].to.split("/"),
						day1 = req.body[criterion].since?parseInt(parts1[0], 10):1, month1 = req.body[criterion].since?parseInt(parts1[1], 10):1,
						day2 = req.body[criterion].to?parseInt(parts2[0], 10):31, month2 = req.body[criterion].to?parseInt(parts2[1], 10):12;
						and = [{$or:[]}, {$or:[]}];
						for (var i=day1; i!==(day2==31?1:day2+1); i++) {
							inside = {};
							inside[criterion] = { $regex: '-'+('0' + i).slice(-2)+'T', $options: 'i' };
							and[0].$or.push(inside);
							if (i==31)
								i=0;
						}
						for (var i=month1; i!==(month2==12?1:month2+1); i++) {
							inside = {};
							inside[criterion] = { $regex: '-'+('0' + i).slice(-2)+'-', $options: 'i' };
							and[1].$or.push(inside);
							if (i==12)
								i=0;
						}
						condition.push({$and: and});
					}
					else {
						inside[criterion] = {};
						if (req.body[criterion].since) {
							var dt = req.body[criterion].since.split("/");
							inside[criterion].$gte = new Date (dt[1] + "/" + dt[0] + "/" + dt[2]);
						}
						if (req.body[criterion].to) {
							var dt2 = req.body[criterion].to.split("/");
							inside[criterion].$lte = new Date (dt2[1] + "/" + dt2[0] + "/" + dt2[2]);
						}
						condition.push(inside);
					}
					break;
				case 'int':
					inside[criterion] = {};
					if (req.body[criterion].since)
						inside[criterion].$gte = parseInt(req.body[criterion].since);
					if (req.body[criterion].to)
						inside[criterion].$lte = parseInt(req.body[criterion].to);
					condition.push(inside);
					break;
				default:
					inside[criterion] = req.body[criterion].content;
					condition.push(inside);
					break;
			}
		}
		condition.push({active: true});
		Agendadb
			.find(condition.length>0?{
				$and: condition
			}:{})
			.sort({name: 1})
			.then(agenda => res.send(agenda))
			.catch(next);
	}
};