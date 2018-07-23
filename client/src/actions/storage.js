import axios from 'axios'; 

import { SHOW_MESSAGE } from './systemMsg';

export const CREATE_VENDOR = 'CREATE_VENDOR';
export const GET_VENDOR = 'GET_VENDOR';
export const UPDATE_VENDOR = 'UPDATE_VENDOR'; // update list
export const DELETE_VENDOR = 'DELETE_VENDOR';
export const FETCH_VENDORS = 'FETCH_VENDORS';

export const CREATE_MATERIAL = 'CREATE_MATERIAL';
export const GET_MATERIAL = 'GET_MATERIAL';
export const UPDATE_MATERIAL = 'UPDATE_MATERIAL'; // update list
export const DELETE_MATERIAL = 'DELETE_MATERIAL';
export const FETCH_MATERIALS = 'FETCH_MATERIALS';
export const FETCH_MATERIALS_BY_DATE = "FETCH_MATERIALS_BY_DATE";

export const ADD_STORAGE_TO_MATERIAL = 'ADD_STORAGE_TO_MATERIAL';

//VENDOR FUNCTIONS
export function createVendor(data, callback) {
	return async dispatch => {
		try {
			const res = await axios.post('/api/vendor', data); 
			dispatch({ type: CREATE_VENDOR, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Fornecedor cadastrado com sucesso (${res.data.name})`, type: 'success' } });

			if (callback) { callback(res.data) }

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro no cadastro do fornecedor. Alguma informação está faltando.`, type: 'danger' } });
			console.log(err); 
		} 
	}
};

export function fetchVendors() {
	return async dispatch => {
		try { 
			const res = await axios.get('/api/vendor'); 
			dispatch({ type: FETCH_VENDORS, payload: res.data });
            //console.log(res.data);
		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro na criação do Lista. Alguma informação está faltando.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function getVendor(vendorId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.get(`/api/vendor/${vendorId}`); 
			
			dispatch({ type: GET_VENDOR, payload: res.data });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Lista não encontrada.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function updateVendor(data, vendorId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.put(`/api/edit_vendor/${vendorId}`, data);
			
			dispatch({ type: UPDATE_VENDOR, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: ` As informações do fornecedor ${res.data.name} foram atualizadas`, type: 'success' } });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Fornecedor não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function deleteVendor(vendorId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.put(`/api/delete_vendor/${vendorId}`, vendorId);
			
			dispatch({ type: DELETE_VENDOR, payload: null });
			dispatch({ type: SHOW_MESSAGE, payload: { message: ` O Fornecedor foi excluído `, type: 'success' } });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Fornecedor não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};


//MATERIALS FUNCTIONS


export function createMaterial(data, callback) {
	return async dispatch => {
		try {
			const res = await axios.post('/api/material', data); 
			dispatch({ type: CREATE_VENDOR, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Produto cadastrado com sucesso (${res.data.name})`, type: 'success' } });

			if (callback) { callback(res.data) }

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro no cadastro do produto. Alguma informação está faltando.`, type: 'danger' } });
			console.log(err); 
		} 
	}
};

export function fetchMaterials() {
	return async dispatch => {
		try { 
			const res = await axios.get('/api/material'); 
			dispatch({ type: FETCH_MATERIALS, payload: res.data });
            
		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro ao retornar lista de Produtos. Alguma informação está faltando.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function fetchMaterialsByDate(data, callback) {
	return async dispatch => {
		try { 
			const res = await axios.put('/api/materialsByDate', data); 
			dispatch({ type: FETCH_MATERIALS_BY_DATE, payload: res.data });
			if(callback){
			callback(res.data);
			}
            
		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro ao retornar Controle de Estoque. Alguma informação está faltando.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function getMaterial(materialId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.get(`/api/material/${materialId}`); 
			
			dispatch({ type: GET_MATERIAL, payload: res.data });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Produto não encontrada.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function updateMaterial(data, materialId, callback) {

	return async dispatch => {
		try { 
			const res = await axios.put(`/api/edit_material/${materialId}`, data);
			
			dispatch({ type: UPDATE_VENDOR, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: ` As informações do produto ${res.data.name} foram atualizadas`, type: 'success' } });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Produto não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function deleteMaterial(materialId, callback) {
	return async dispatch => {
		try { 
			const res = await axios.put(`/api/delete_material/${materialId}`, materialId);
			
			dispatch({ type: DELETE_MATERIAL, payload: null });
			dispatch({ type: SHOW_MESSAGE, payload: { message: ` O Produto foi excluído `, type: 'success' } });

			callback(res.data);

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro. Produto não encontrado.`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};


export function addStorage(data, callback) {
	return async dispatch => {
		try {
			
			const res = await axios.put(`/api/add_storage_to_material/${data.material_id}`, data);
			
			dispatch({ type: ADD_STORAGE_TO_MATERIAL, payload: res.data });
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Estoque do produto (${res.data.name}) alterado com sucesso`, type: 'success' } });

			if (callback) { callback(res.data) }

		} catch(err) { 
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro na alteração do estoque do produto`, type: 'danger' } });
			console.log(err); 
		} 
	}
};