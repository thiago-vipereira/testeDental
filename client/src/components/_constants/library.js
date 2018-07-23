import moment from 'moment';

export const LIBRARY = {
    ddmmaaaa: (_key, date, format) => `${moment(date).format(format)}`,
    not_confirmed: 'Não confirmado',
	first_attempt: '1ª tentativa',
	second_attempt: '2ª tentativa',
	third_attempt: '3ª tentativa',
	confirmed: 'Confirmado',
	waiting_room: 'Sala de espera',
	attended: 'Atendido',	
    justified_missing : 'Falta justificada',
	unjustified_missing: 'Falta injustificada',
	agenda_schedule_validation: 'Deseja agendar fora do horário de agendamento do Dentista?',
	agenda_vacation_validation: 'Deseja agendar em período de férias do Dentista?',
	denstist_schedule_validation: 'Já possui um agendamento no horário escolhido, deseja agendar mesmo assim?',

	day: 'Dia',
	month: 'Mês',
	week: 'Semana',
	agenda: 'Agenda',
	today: 'Hoje',
	previous: 'Anterior',
	next: 'Próximo',
};


// mask { T.translate("text") }
// date mask { T.translate("ddmmaaaa", { date: new Date(), format: "DD/MM/YYYY" }) }