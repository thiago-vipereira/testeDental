import axios from 'axios'; 

import { SHOW_MESSAGE } from './systemMsg';

export const CREATE_MODEL = 'CREATE_MODEL';
export const GET_MODEL = 'GET_MODEL';
export const UPDATE_MODEL = 'UPDATE_MODEL'; // update model
export const DELETE_MODEL = 'DELETE_MODEL';
export const FETCH_MODELS = 'FETCH_MODELS';
export const FETCH_TYPE_MODELS = 'FETCH_TYPE_MODELS';
export const GET_MENTION = 'GET_MENTION';

export function createModel(data, callback) {
	return async dispatch => {
		try {
			const res = await axios.post('/api/document_model', data); 
			dispatch({ type: CREATE_MODEL, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Modelo criado com sucesso (${res.data.name})`, type: 'success' } });

			if (callback) { callback(res.data) }

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro na criação do Modelo. Alguma informação está faltando.`, type: 'danger' } });
			console.log(err); 
		} 
	}
};

export function getModel(modelId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.get(`/api/document_model/${modelId}`); 
			
			dispatch({ type: GET_MODEL, payload: res.data });
			if (callback)
				callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Modelo não encontrado.`, type: 'danger' } });
			console.log(err); 
		}
	}
};

export function fetchModelByType(documentType, callback) {
	return async dispatch => {
		try { 
			const res = await axios.put('/api/document_model', documentType?{documentType}:{}); 
			dispatch({ type: FETCH_TYPE_MODELS, payload: res.data });
			if (callback)
				callback(res.data);
		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro na Listagem dos Modelos`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function fetchModel(callback) {
	return async dispatch => {
		try { 
			const res = await axios.put('/api/document_model'); 
			dispatch({ type: FETCH_MODELS, payload: res.data });
			if (callback)
				callback(res.data);
		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro na Listagem dos Modelos`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function updateModel(data, modelId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.put(`/api/document_model/${modelId}`, data);
			
			dispatch({ type: UPDATE_MODEL, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: ` As informações de ${res.data.name} foram atualizadas`, type: 'success' } });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Modelo não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function deleteModel(modelId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.delete(`/api/document_model/${modelId}`, modelId);
			
			dispatch({ type: DELETE_MODEL, payload: null });
			dispatch({ type: SHOW_MESSAGE, payload: { message: ` O Modelo foi excluida `, type: 'success' } });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Modelo não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function getMention(callback) {
	return async dispatch => {
		try {
			var menu = [];
			menu.push({name: 'Paciente', label: 'paciente', url: 'patient', open: false, suggestions: {...await axios.post('/api/patient/schema')}.data});
			menu.push({name: 'Dentista', label: 'dentista', url: 'dentist', open: false, suggestions: {...await axios.post('/api/dentist/schema')}.data});
			menu.push({name: 'Usuário', label: 'usuario', url: 'user', open: false, suggestions: {...await axios.post('/api/user/schema')}.data});
			menu.push({name: 'Fornecedor', label: 'fornecedor', url: 'vendor', open: false, suggestions: {...await axios.post('/api/vendor/schema')}.data});
			menu.push({name: 'Destinatário', label: 'destinatario', url: 'receiver', open: false, suggestions: []});
			menu[3].suggestions.map((item) => {
				for (var i=0; i<3; i++)
					if (!menu[i].suggestions.includes(item))
						return false;
				menu[4].suggestions.push(item);
			});
			dispatch({ type: GET_MENTION, payload: menu});
			if (callback !== undefined)
				callback(menu);

		} catch(err) { 
			console.log(err); 
		} 
	} 
};