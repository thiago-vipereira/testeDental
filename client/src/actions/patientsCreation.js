import axios from 'axios';

import { SHOW_MESSAGE } from '../actions/systemMsg';

export const CREATE_PATIENT = 'CREATE_PATIENT';
export const CREATE_PATIENT_ERROR = 'CREATE_PATIENT_ERROR';
export const GET_PATIENT = 'GET_PATIENT';
export const CLEAR_PATIENT = 'CLEAR_PATIENT';

export function createPatient({ name, telephone, clinicId }, callback) {
	return async dispatch => {
		try {
			const res = await axios.post('/api/patient', {
				name,
				clinic_id: clinicId,
				telephones: [{ name: 'Principal', value: telephone }]
			});

			if (typeof res.data !== 'string') {
				dispatch({ type: CREATE_PATIENT, payload: res.data });
				dispatch({ type: SHOW_MESSAGE, payload: { message: `Paciente salvo com sucesso (${res.data.name})`, type: 'success' } });

				callback(res.data);
			} else {
				callback(res.data);
				dispatch({ type: CREATE_PATIENT_ERROR, payload: res.data });
			}
	
		} catch(err) {
			console.log(err);
		}
	}
};

export function createPatientFull(data, callback) {
	return async dispatch => {
		try {
			const res = await axios.post('/api/patient', data); 
			dispatch({ type: CREATE_PATIENT, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Paciente salvo com sucesso (${res.data.name})`, type: 'success' } });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro na criação do Lista. Alguma informação está faltando.`, type: 'danger' } });
			console.log(err); 
		} 
	}
};

export function updatePatient(data, patientId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.put(`/api/patient/${patientId}`, data);
			
			dispatch({ type: GET_PATIENT, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: ` As informações de ${res.data.name} foram atualizadas`, type: 'success' } });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Paciente não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function getPatient(patientId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.get(`/api/patient/${patientId}`);
			dispatch({ type: GET_PATIENT, payload: res.data });
			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Paciente não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function passPatient(patient) {
	return async dispatch => {
		try { 
			dispatch({ type: GET_PATIENT, payload: patient });
		} catch(err) {
			console.log(err); 
		}
	}
};

export function clearPatient() { 
	return async dispatch => { 
		dispatch({ type: CLEAR_PATIENT, payload: null }); 
	} 
};
