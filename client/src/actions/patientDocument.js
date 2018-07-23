import axios from 'axios'; 

import { SHOW_MESSAGE } from './systemMsg';

export const SAVE_DOCUMENT = 'SAVE_DOCUMENT';
export const FETCH_DOCUMENT = 'FETCH_DOCUMENT';
export const GET_PATIENT_DOCUMENT = 'GET_PATIENT_DOCUMENT';

export function savePatientDocument(patientId, document, callback) {
	return async dispatch => {
		try {
			const res = await axios.post(`/api/document/patient/${patientId}`, document); 
			dispatch({ type: SAVE_DOCUMENT, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Anamnese ${document.name} salvo com sucesso`, type: 'success' } });

			if (callback)
				callback(res.data)

		} catch(err) {
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro ao salvar Anamnese. Alguma informação está faltando.`, type: 'danger' } });
			console.log(err);
		} 
	}
};

export function getPatientDocument(patientId, documentId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.get(`/api/document/patient/${patientId}/${documentId}`); 
			
			dispatch({ type: GET_PATIENT_DOCUMENT, payload: res.data });

			if (callback)
				callback(res.data)

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Anamnese não encontrado.`, type: 'danger' } });
			console.log(err); 
		}
	}
};

export function fetchPatientDocument(patientId, documentType, callback) {
	return async dispatch => {
		try { 
			const res = await axios.put(`/api/document/patient/${patientId}`, documentType?{documentType}:{});
			
			dispatch({ type: FETCH_DOCUMENT, payload: res.data });

			if (callback)
				callback(res.data)

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Anamnese não encontrado.`, type: 'danger' } });
			console.log(err); 
		}
	} 
};