import {
	AUTH_USER,
	AUTH_LOAD_CLINIC,
	LOGOUT,
	UNAUTH,
	CHANGING_PASS,
	APP_CHANGE_PASS,
	GET_FULL_USER,
	SELECT_CLINIC,
	DROP,
	UPDATE_CLINIC
} from '../actions/auth';

export default function(state = { authenticated: false }, action) {
	switch(action.type) {
		case AUTH_USER:
			return {
				user: action.payload.user,
				clinic: action.payload.clinic,
				authenticated: true
			};
		case AUTH_LOAD_CLINIC:
			return { ...state, user: action.payload, message: 'loading clinic' };
		case UNAUTH:
			return { ...state, user: null, message: 'unauthorized', authenticated: false };
		case DROP:
			return { ...state, user: null, message: 'drop', authenticated: false };
		case CHANGING_PASS:
			return { ...state, user: null, message: 'changing pass' };
		case GET_FULL_USER:
			return { ...state, user: action.payload };
		case SELECT_CLINIC:
			return { ...state, clinic: action.payload };
		case UPDATE_CLINIC:
			return { ...state, clinic: action.payload };
		case APP_CHANGE_PASS:
			return { ...state, user: action.payload, message: null };
		case LOGOUT:
			return { ...state, user: null, message: 'logged out' };
		default:
			return state;
	}
}
