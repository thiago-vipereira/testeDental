import axios from 'axios';
import { SHOW_MESSAGE } from '../actions/systemMsg';

export function sendEmail(title, html, destination, callback) {
  return async dispatch => {
		try {
			const res = await axios.post('/api/email', {title, html, destination});
      // dispatch({ type: FETCH_PATIENTS, payload: res.data });
      dispatch({ type: SHOW_MESSAGE, payload: { message: `Email enviado com sucesso`, type: 'success' } });
      if (callback)
  			callback(res.data);
		} catch(err) {
			console.log(err);
		}
  }
};