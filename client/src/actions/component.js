import axios from 'axios'; 

import { SHOW_MESSAGE } from '../actions/systemMsg';

export const INPUT_AUTO_COMPLETE = 'INPUT_AUTO_COMPLETE';
export const PATIENT_AUTO_COMPLETE = 'INPUT_AUTO_COMPLETE';

export function fetch(data, callback) {

	return async dispatch => {
		try {

			const res = await axios.post(`/api/input_auto_complete/`,data); 
			dispatch({ type: INPUT_AUTO_COMPLETE, payload: res.data });
			if (callback) { callback(res.data) }

		} catch(err) {
			console.log(err);
		} 
	}
};

export function patientFetch(data, callback) {
	
	return async dispatch => {
		try {

			const res = await axios.post(`/api/patient_auto_complete/`,data); 
			dispatch({ type: PATIENT_AUTO_COMPLETE, payload: res.data });
			if (callback) { callback(res.data) }

		} catch(err) {
			console.log(err); 
		} 
	}
};

export function agendaPatientCriation() {
	
	return async dispatch => {
		dispatch({ type: SHOW_MESSAGE, payload: { message: `Paciente salvo com sucesso`, type: 'success' } });
	}
};