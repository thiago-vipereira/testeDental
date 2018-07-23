import axios from 'axios'; 

import { SHOW_MESSAGE } from './systemMsg';

export const CREATE_ANAMNESIS = 'CREATE_ANAMNESIS';
export const GET_ANAMNESIS = 'GET_ANAMNESIS';
export const UPDATE_ANAMNESIS = 'UPDATE_ANAMNESIS'; // update model
export const DELETE_ANAMNESIS = 'DELETE_ANAMNESIS';
export const FETCH_ANAMNESIS = 'FETCH_ANAMNESIS';

export function createAnamnese(data, callback) {
	return async dispatch => {
		try {
			const res = await axios.post('/api/anamnese_model', data); 
			dispatch({ type: CREATE_ANAMNESIS, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Anamnese criado com sucesso (${res.data.name})`, type: 'success' } });

			if (callback) { callback(res.data) }

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro na criação do Anamnese. Alguma informação está faltando.`, type: 'danger' } });
			console.log(err); 
		} 
	}
};

export function getAnamnese(modelId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.get(`/api/anamnese_model/${modelId}`); 
			
			dispatch({ type: GET_ANAMNESIS, payload: res.data });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Anamnese não encontrado.`, type: 'danger' } });
			console.log(err); 
		}
	}
};

export function fetchAnamnese(callback) {
	return async dispatch => {
		try { 
			const res = await axios.get('/api/anamnese_model'); 
			dispatch({ type: FETCH_ANAMNESIS, payload: res.data });
			if (callback)
				callback(res.data);
		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro na Listagem dos Anamneses`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function updateAnamnese(data, modelId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.put(`/api/anamnese_model/${modelId}`, data);
			
			dispatch({ type: UPDATE_ANAMNESIS, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: ` As informações de ${res.data.name} foram atualizadas`, type: 'success' } });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Anamnese não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function deleteAnamnese(modelId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.delete(`/api/anamnese_model/${modelId}`, modelId);
			
			dispatch({ type: DELETE_ANAMNESIS, payload: null });
			dispatch({ type: SHOW_MESSAGE, payload: { message: ` O Anamnese foi excluida `, type: 'success' } });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Anamnese não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};