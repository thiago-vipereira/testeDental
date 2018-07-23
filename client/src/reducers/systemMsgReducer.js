import {
    SHOW_MESSAGE,
    HIDE_MESSAGE
} from '../actions/systemMsg';

export default function(state = { show: false }, action) {
	switch(action.type) {
		case SHOW_MESSAGE:
            return { message: action.payload.message, type: action.payload.type, undo: action.payload.undo, show: true };
        case HIDE_MESSAGE:
			return { show: false };
		default:
			return state;
	}
}
