//import axios from 'axios';

export const SHOW_MESSAGE = 'SHOW_MESSAGE';
export const HIDE_MESSAGE = 'HIDE_MESSAGE';

export function showMessage(message) {
	return async dispatch => {
		dispatch({ type: SHOW_MESSAGE, payload: message });
	}
};

export function hideMessage() {
	return async dispatch => {
		dispatch({ type: HIDE_MESSAGE, payload: 'hide message' });
	}
};