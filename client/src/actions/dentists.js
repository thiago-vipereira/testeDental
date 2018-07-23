import axios from 'axios'; 

import { SHOW_MESSAGE } from './systemMsg';

export const CREATE_DENTIST = 'CREATE_DENTIST';
export const FETCH_DENTISTS = 'FETCH_DENTISTS';
export const GET_DENTIST = 'GET_DENTIST';
export const UPDATE_DENTIST = 'UPDATE_DENTIST';

export const CLEAR_DENTIST = 'CLEAR_DENTIST';


export function createDentist(data) { 
	return async dispatch => { 
		try { 
			const res = await axios.post('/api/dentist', data); 
			console.log(res.data);
			dispatch({ type: CREATE_DENTIST, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Dentista criado com sucesso (${res.data.name})`, type: 'success' } });

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro na criação do dentista. Alguma informação está faltando.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function fetchDentists() { 
	return async dispatch => { 
		try { 
			const res = await axios.get('/api/dentists');
			
			dispatch({ type: FETCH_DENTISTS, payload: res.data });

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro na criação do dentista. Alguma informação está faltando.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function getDentist(dentistId, callback) { 
	return async dispatch => { 
		try { 
			const res = await axios.get(`/api/dentist/${dentistId}`); 
			
			dispatch({ type: GET_DENTIST, payload: res.data });

			if (callback) { callback(res.data) }

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Dentista não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function updateDentist(data, dentistId) { 
	return async dispatch => { 
		try { 
			const res = await axios.put(`/api/dentist/${dentistId}`, data); 
			
			dispatch({ type: UPDATE_DENTIST, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: ` As informações de ${res.data.name} foram atualizadas`, type: 'success' } });

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Dentista não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function deleteDentist(dentistId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.get(`/api/dentist_delete/${dentistId}`);
			
			dispatch({ type: CLEAR_DENTIST, payload: null });
			dispatch({ type: SHOW_MESSAGE, payload: { message: ` Dentista excluido com sucesso! `, type: 'success' } });

			callback(res.data)

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Dentista não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function clearDentist() { 
	return async dispatch => { 
		dispatch({ type: CLEAR_DENTIST, payload: null }); 
	} 
};