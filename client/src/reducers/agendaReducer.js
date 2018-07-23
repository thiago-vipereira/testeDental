import {
	FILTER_AGENDA
} from '../actions/agendaSearch';

export default function(state = {}, action) {
	switch(action.type) {
		case FILTER_AGENDA:
			return { ...state, suggestions: action.payload };
		default:
			return state;
	}
}
