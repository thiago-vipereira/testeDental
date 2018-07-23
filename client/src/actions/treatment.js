import axios from 'axios'; 

import { SHOW_MESSAGE } from './systemMsg';

export const GET_TREATMENT = 'GET_TREATMENT';
export const FETCH_TREATMENT = 'FETCH_TREATMENT';
export const EDIT_TREATMENT = 'EDIT_TREATMENT';
export const CLEAR_TREATMENT = 'CLEAR_TREATMENT';


export function getTreatment(patientId, callback) {
	return async dispatch => { 
		try { 
			const res = await axios.get(`/api/treatment/${patientId}`); 
			
			dispatch({ type: GET_TREATMENT, payload: res.data });

			callback(res.data);

		} catch(err) {
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Tratamento não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function updateTreatment(data, patientId, callback) {
	return async dispatch => {
		try {
			const res = await axios.put(`/api/treatment/${patientId}`, data);
			
			dispatch({ type: EDIT_TREATMENT, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Tratamento atualizado com sucesso! `, type: 'success' } });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Tratamento não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function fetchTreatments(patientId, callback) {
	return async dispatch => { 
		try {
			const res = await axios.get(`/api/treatments/${patientId}`);
			
			dispatch({ type: FETCH_TREATMENT, payload: res.data });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Alguma informação está faltando.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function clearOdontogram() { 
	return async dispatch => { 
		dispatch({ type: CLEAR_TREATMENT, payload: null }); 
	} 
};