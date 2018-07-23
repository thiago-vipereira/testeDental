const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const agendaConfigSchema = new Schema({
    interval: Number,
    procedures: [{ name: String }],
});

const AgendaConfig = mongoose.model('agendaConfig', agendaConfigSchema);
module.exports = AgendaConfig;