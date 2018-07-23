import axios from 'axios'; 

import { SHOW_MESSAGE } from './systemMsg';

export const GET_PERIOGRAM = 'GET_PERIOGRAM';
export const FETCH_PERIOGRAM = 'FETCH_PERIOGRAM';
export const EDIT_PERIOGRAM = 'EDIT_PERIOGRAM';
export const CLEAR_PERIOGRAM = 'CLEAR_PERIOGRAM';


export function getPeriogram(sessionId, callback) {
	return async dispatch => { 
		try { 
			const res = await axios.get(`/api/periodontic_session/${sessionId}`); 
			
			dispatch({ type: GET_PERIOGRAM, payload: res.data });

			callback(res.data);

		} catch(err) {
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Periograma não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function updatePeriogram(data, patientId, callback) {
    console.log(data);
	return async dispatch => {
		try {
			const res = await axios.put(`/api/periodontic_session/${patientId}`, data);
			
			dispatch({ type: EDIT_PERIOGRAM, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Periograma salvo com sucesso! `, type: 'success' } });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Periograma não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function fetchPeriograms(patientId, callback) {
	return async dispatch => { 
		try {
			const res = await axios.get(`/api/periodontics_session/${patientId}`);
			
			dispatch({ type: FETCH_PERIOGRAM, payload: res.data });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Alguma informação está faltando.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function clearPeriogram() { 
	return async dispatch => { 
		dispatch({ type: CLEAR_PERIOGRAM, payload: null }); 
	} 
};