import axios from 'axios'; 

import { SHOW_MESSAGE } from './systemMsg';

export const GET_ODONTOGRAM = 'GET_ODONTOGRAM';
export const FETCH_ODONTOGRAM = 'FETCH_ODONTOGRAM';
export const EDIT_ODONTOGRAM = 'EDIT_ODONTOGRAM';
export const CLEAR_ODONTOGRAM = 'CLEAR_ODONTOGRAM';


export function getOdontogram(patientId, callback) {
	return async dispatch => { 
		try { 
			const res = await axios.get(`/api/odontogram/${patientId}`); 
			
			dispatch({ type: GET_ODONTOGRAM, payload: res.data });

			callback(res.data);

		} catch(err) {
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Odontograma não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function updateOdontogram(data, patientId, callback) {
	return async dispatch => {
		try {
			const res = await axios.put(`/api/odontogram/${patientId}`, data);
			
			dispatch({ type: EDIT_ODONTOGRAM, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Odontograma atualizado com sucesso! `, type: 'success' } });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Odontograma não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function fetchOdontograms(patientId, callback) {
	return async dispatch => { 
		try {
			const res = await axios.get(`/api/odontograms/${patientId}`);
			
			dispatch({ type: FETCH_ODONTOGRAM, payload: res.data });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Alguma informação está faltando.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function clearOdontogram() { 
	return async dispatch => { 
		dispatch({ type: CLEAR_ODONTOGRAM, payload: null }); 
	} 
};