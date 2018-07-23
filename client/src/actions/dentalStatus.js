import axios from 'axios'; 

import { SHOW_MESSAGE } from './systemMsg';

export const FETCH_DENTAL_STATUS = 'FETCH_DENTAL_STATUS';
export const EDIT_DENTAL_STATUS = 'EDIT_DENTAL_STATUS';
export const CLEAR_DENTAL_STATUS = 'CLEAR_DENTAL_STATUS';


export function getDentalStatus(patientId, callback) {
	return async dispatch => { 
		try { 
			const res = await axios.get(`/api/dental_status/${patientId}`); 
			
			dispatch({ type: FETCH_DENTAL_STATUS, payload: res.data });

			callback(res.data);

		} catch(err) {
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Status da Arcada Dentária não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function updateDentalStatus(data, patientId, callback) {
	return async dispatch => {
		try {
			const res = await axios.put(`/api/dental_status/${patientId}`, data);
			
			dispatch({ type: EDIT_DENTAL_STATUS, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Status da Arcada Dentária atualizado com sucesso! `, type: 'success' } });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Status da Arcada Dentária não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function clearDentalStatus() { 
	return async dispatch => { 
		dispatch({ type: CLEAR_DENTAL_STATUS, payload: null }); 
	} 
};