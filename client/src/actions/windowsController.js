import axios from 'axios'; 

import { SHOW_MESSAGE } from './systemMsg';

export const ADD_WINDOWS = 'ADD_WINDOWS';
export const UPDATE_WINDOWS = 'UPDATE_WINDOWS';
export const CLEAR_WINDOWS = 'CLEAR_WINDOWS';
export const REMOVE_WINDOWS = 'REMOVE_WINDOWS';

export function addToWindows(value, callback) {
	return async dispatch => { 
		try {
			dispatch({ type: ADD_WINDOWS, payload: value });
			callback(null);

		} catch(err) {
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro nas Janelas`, type: 'danger' } });
			console.log(err); 
		}
	} 
};

export function removeToWindows(value, callback) {
	return async dispatch => {
		try {
			dispatch({ type: REMOVE_WINDOWS, payload: value });
			callback(null);

		} catch(err) {
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro nas Janelas`, type: 'danger' } });
			console.log(err); 
		}
	}
};

export function windowsFetchTreatment(patientId, callback) {
	return async dispatch => {
		try {
			const res = await axios.get(`/api/treatment/${patientId}`); 
			console.log(res.data);
			var value = { type: 'TREATMENT', id: res.data._id, opened: true, data: { value: res.data }};
			dispatch({ type: UPDATE_WINDOWS, payload: value });
			callback(value);

		} catch(err) {
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Erro nas Janelas`, type: 'danger' } });
			console.log(err); 
		} 
	} 
};

export function clearWindows() {
	return async dispatch => { 
		dispatch({ type: CLEAR_WINDOWS, payload: null }); 
	} 
};