import axios from 'axios';
import { SHOW_MESSAGE, HIDE_MESSAGE } from '../actions/systemMsg';

export function ravelOut ({ db, props }, callback) {
	return async dispatch => {
		try {
      const res = await axios.put(`/api/undo/${db}`, props);
			callback(res.data);
      dispatch({ type: HIDE_MESSAGE, payload: 'hide message' });
			setTimeout(() => dispatch({ type: SHOW_MESSAGE, payload: { message: `Ação desfeita com sucesso`, type: 'success' } }), 1000);
		} catch(err) {
			console.log(err);
		}
	}
};