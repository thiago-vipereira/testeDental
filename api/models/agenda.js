const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const agendaSchema = new Schema({
    title: String,
    id_title: String,
    user: String,
    id_user: String,
    patient: String,
    id_patient: String,
    telephone: String,
    allDay: Boolean,
    start: Date,
    end: Date,
    desc: String,
    status: String,
    active: {
		  type: Boolean,
		  default: true
	  }
});

const Agenda = mongoose.model('agenda', agendaSchema);
module.exports = Agenda;