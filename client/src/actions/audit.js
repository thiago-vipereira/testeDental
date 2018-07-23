import axios from 'axios';

import { SHOW_MESSAGE } from './systemMsg';

export const FETCH_AUDIT = 'FETCH_AUDIT'; 

export function fetchtAudit(data, callback) {
	return async dispatch => {
		try {
			const res = await axios.put(`/api/fetch_audit`, data);
			
			dispatch({ type: FETCH_AUDIT, payload: res.data });

			callback(res.data);
		} catch(err) {
			console.log(err);
		}
	}
};

export function reverseAudit(data, callback) {
	return async dispatch => {
		try {
			const res = await axios.get(`/api/reverse_audit/${data}`);

			dispatch({ type: SHOW_MESSAGE, payload: { message: ` As informações de ${res.data.name} foram atualizadas`, type: 'success' } });
			dispatch({ type: FETCH_AUDIT, payload: 'refresh' });

			callback(res.data);
		} catch(err) {
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Ação não executada.`, type: 'danger' } });
			console.log(err);
		}
	}
};

export function clearAudit() { 
	return async dispatch => {
		dispatch({ type: FETCH_AUDIT, payload: null }); 
	} 
};