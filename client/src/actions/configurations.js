import axios from 'axios';
import { SHOW_MESSAGE } from '../actions/systemMsg';

export const SELECT_USER = 'SELECT_USER';

export function updateProfile(profileData, userId, callback) {
	return async dispatch => {
		try {
			const res = await axios.put(`/api/user_update/${userId}`, profileData);
			dispatch({ type: SHOW_MESSAGE, payload: { message: `As informações do seu perfil foram salvas`, type: 'success' } });
			callback(res.data);
		} catch(err) {
			dispatch({ type: SHOW_MESSAGE, payload: { message: `Aconteceu um erro (${err})`, type: 'danger' } });
		}
	}
};