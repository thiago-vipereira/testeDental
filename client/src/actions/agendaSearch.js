import axios from 'axios';
import { SHOW_MESSAGE } from '../actions/systemMsg';

export const FILTER_AGENDA = 'FILTER_AGENDA';

export function advancedFilter(props, callback) {
	return async dispatch => {
		try {
			const res = await axios.post('/api/agenda/filter', props);
			dispatch({ type: FILTER_AGENDA, payload: res.data });
			callback();
		} catch(err) {
			console.log(err);
		}
	}
};