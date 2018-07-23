import axios from 'axios'; 

import { SHOW_MESSAGE } from './systemMsg';

export const CREATE_LIST = 'CREATE_LIST';
export const GET_LIST = 'GET_LIST';
export const UPDATE_PROCEDURE = 'UPDATE_PROCEDURE'; // update list
export const DELETE_LIST = 'DELETE_LIST';
export const FETCH_LISTS = 'FETCH_LISTS';

export const FETCH_GROUPS = 'FETCH_GROUPS';
export const SELECTED_GROUP = 'SELECTED_GROUP';

export const FETCH_PROCEDURES = 'FETCH_PROCEDURES';
export const GET_PROCEDURE = 'GET_PROCEDURE';

export function createList(data, callback) {
	return async dispatch => {
		try {
			const res = await axios.post('/api/procedures_list', data); 
			dispatch({ type: CREATE_LIST, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Lista criado com sucesso (${res.data.name})`, type: 'success' } });

			if (callback) { callback(res.data) }

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro na criação do Lista. Alguma informação está faltando.`, type: 'danger' } });
			console.log(err); 
		} 
	}
};

export function fetchList() {
	return async dispatch => {
		try { 
			const res = await axios.get('/api/procedures_lists'); 
			dispatch({ type: FETCH_LISTS, payload: res.data });

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro na criação do Lista. Alguma informação está faltando.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function fetchListCallback(callback) {
	return async dispatch => {
		try { 
			const res = await axios.get('/api/procedures_lists'); 
			dispatch({ type: FETCH_LISTS, payload: res.data });

			if (callback) { callback(res.data) }

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro na criação do Lista. Alguma informação está faltando.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function getList(procedureId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.get(`/api/procedures_list/${procedureId}`); 
			
			dispatch({ type: GET_LIST, payload: res.data });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Lista não encontrada.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function updateList(data, procedureId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.put(`/api/procedures_list/${procedureId}`, data);
			
			dispatch({ type: UPDATE_PROCEDURE, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: ` As informações de ${res.data.name} foram atualizadas`, type: 'success' } });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Lista não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function deleteList(procedureId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.put(`/api/delete_list/${procedureId}`, procedureId);
			
			dispatch({ type: DELETE_LIST, payload: null });
			dispatch({ type: SHOW_MESSAGE, payload: { message: ` A Lista foi excluida `, type: 'success' } });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Lista não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

/*export function getGroup(procedureId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.get(`aaa/api/procedures_list/${procedureId}`); 
			
			dispatch({ type: GET_PROCEDURE, payload: res.data });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Lista não encontrada.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};*/

export function creatGroup(data, procedureId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.put(`/api/group_create/${procedureId}`, data);
			
			dispatch({ type: UPDATE_PROCEDURE, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: ` As informações de ${res.data.name} foram atualizadas`, type: 'success' } });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Lista não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function updateGroup(data, procedureId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.put(`/api/group_edit/${procedureId}`, data);
			
			dispatch({ type: UPDATE_PROCEDURE, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: ` As informações de ${res.data.name} foram atualizadas`, type: 'success' } });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Lista não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function deleteGroup(data, procedureId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.put(`/api/group_delete/${procedureId}/${data}`);
			
			dispatch({ type: UPDATE_PROCEDURE, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: ` As informações de ${res.data.name} foram atualizadas`, type: 'success' } });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Lista não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function fetchGroup(procedureId, callback) {
	return async dispatch => {
		try { 

			const res = await axios.get(`/api/fetch_groups/${procedureId}`);

			dispatch({ type: FETCH_GROUPS, payload: res.data });

			callback(res.data);

		} catch(err) {
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro alguma informação está faltando.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function selectedGroup(selected, callback) {
	return async dispatch => {
		try { 

			dispatch({ type: SELECTED_GROUP, payload: selected });
			callback(selected);

		} catch(err) {
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro alguma informação está faltando.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function fetchProcedure(listId, groupId ,callback) {
	return async dispatch => {
		try { 

			const res = await axios.get(`/api/fetch_procedures/${listId}/${groupId}`);

			dispatch({ type: FETCH_PROCEDURES, payload: res.data });

			callback(res.data);

		} catch(err) {
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro alguma informação está faltando.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function createProcedure(data, procedureId, callback) {
	return async dispatch => {
		try {
			
			const res = await axios.put(`/api/procedure_create/${procedureId}`, data);
			
			dispatch({ type: UPDATE_PROCEDURE, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: ` As informações de ${res.data.name} foram atualizadas`, type: 'success' } });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Lista não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function getProcedure(listId, groupId, procedureId, callback) {
	return async dispatch => {
		try {
			
			const res = await axios.get(`/api/get_procedure/${listId}/${groupId}/${procedureId}`);
			dispatch({ type: GET_PROCEDURE, payload: res.data });
			
			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Lista não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function editProcedure(data, listId, groupId, procedureId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.put(`/api/edit_procedure/${listId}/${groupId}/${procedureId}`, data);
			
			dispatch({ type: UPDATE_PROCEDURE, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: ` As informações de ${res.data.name} foram atualizadas`, type: 'success' } });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Lista não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function deleteProcedure(listId, groupId, procedureId, callback) {
	return async dispatch => {
		try {
			
			const res = await axios.put(`/api/procedure_delete/${listId}/${groupId}/${procedureId}`);
			
			dispatch({ type: UPDATE_PROCEDURE, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: ` As informações de ${res.data.name} foram atualizadas`, type: 'success' } });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Lista não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};