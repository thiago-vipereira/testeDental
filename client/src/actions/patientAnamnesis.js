import axios from 'axios'; 

import { SHOW_MESSAGE } from './systemMsg';

export const SAVE_ANAMNESIS = 'SAVE_ANAMNESIS';
export const FETCH_ANAMNESIS = 'FETCH_ANAMNESIS';
export const GET_PATIENT_ANAMNESIS = 'GET_PATIENT_ANAMNESIS';

export function savePatientAnamnesis(patientId, anamnesis, callback) {
	return async dispatch => {
		try {
			const res = await axios.post(`/api/anamnesis/patient/${patientId}`, anamnesis); 
			dispatch({ type: SAVE_ANAMNESIS, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Anamnese ${anamnesis.name} salvo com sucesso`, type: 'success' } });

			if (callback)
				callback(res.data)

		} catch(err) {
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro ao salvar Anamnese. Alguma informação está faltando.`, type: 'danger' } });
			console.log(err);
		} 
	}
};

export function getPatientAnamnesis(patientId, anamnesisId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.get(`/api/anamnesis/patient/${patientId}/${anamnesisId}`); 
			
			dispatch({ type: GET_PATIENT_ANAMNESIS, payload: res.data });

			if (callback)
				callback(res.data)

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Anamnese não encontrado.`, type: 'danger' } });
			console.log(err); 
		}
	}
};

export function fetchPatientAnamnesis(patientId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.get(`/api/anamnesis/patient/${patientId}`); 
			
			dispatch({ type: FETCH_ANAMNESIS, payload: res.data });

			if (callback)
				callback(res.data)

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Anamnese não encontrado.`, type: 'danger' } });
			console.log(err); 
		}
	} 
};