import axios from 'axios';

import { SHOW_MESSAGE } from './systemMsg';

export const FETCH_CLINIC_USERS = 'FETCH_CLINIC_USERS'; 
export const GET_CLINIC_USER = 'GET_CLINIC_USER';
export const CLEAR_USER = 'CLEAR_USER';

export function fetchUsers(users) { 
	return async dispatch => { 
		try { 
			const res = await axios.post('/api/users', users); 

			dispatch({ type: FETCH_CLINIC_USERS, payload: res.data }); 
		} catch(err) { 
			console.log(err); 
		} 
	} 
};

export function getUser(userId, callback) {
	return async dispatch => {
		try {
			const res = await axios.get(`/api/user/${userId}`);
			
			dispatch({ type: GET_CLINIC_USER, payload: res.data });

			callback(res.data);
		} catch(err) {
			console.log(err);
		}
	}
};

export function updateUser(data, userId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.put(`/api/user_update/${userId}`, data);
			
			dispatch({ type: GET_CLINIC_USER, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: ` As informações de ${res.data.name} foram atualizadas`, type: 'success' } });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Usuário não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function clearUser() { 
	return async dispatch => { 
		dispatch({ type: CLEAR_USER, payload: null }); 
	} 
};