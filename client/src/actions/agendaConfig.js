import axios from 'axios'; 

import { SHOW_MESSAGE } from './systemMsg';

export const FETCH_AGENDA_CONFIG = 'FETCH_AGENDA_CONFIG';
export const EDIT_AGENDA_CONFIG = 'EDIT_AGENDA_CONFIG';
export const DENTIST_SCHEDULE = 'DENTIST_SCHEDULE';

export function editAgendaConfig(data) {
	return async dispatch => {
		try {
			const res = await axios.post('/api/agenda_config', data); 
			dispatch({ type: EDIT_AGENDA_CONFIG, payload: res.data });
		} catch(err) { 
			console.log(err); 
		} 
	}
};

export function fetchAgendaConfig() {
	return async dispatch => {
		try {
			const res = await axios.get('/api/agenda_fetch');
			dispatch({ type: FETCH_AGENDA_CONFIG, payload: res.data });
		} catch(err) { 
			console.log(err); 
		} 
	} 
};

export function checkDentistSchedule(data, callback) {
	return async dispatch => {
		try {
			const res = await axios.post('/api/agenda', data);
			dispatch({ type: DENTIST_SCHEDULE, payload: res.data });
			callback(res.data);
		} catch(err) { 
			console.log(err); 
		} 
	} 
};