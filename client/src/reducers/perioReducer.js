import {
    GET_PERIOGRAM, 
    FETCH_PERIOGRAM,
    EDIT_PERIOGRAM,
    CLEAR_PERIOGRAM,
} from '../actions/periogram';
 
export default function(state = {}, action) { 
    switch(action.type) {
        case GET_PERIOGRAM:
        return { ...state, perio: action.payload };
        case FETCH_PERIOGRAM:
            return { ...state, perios: action.payload };
        case EDIT_PERIOGRAM: 
            return { ...state, perio: action.payload };
        case CLEAR_PERIOGRAM:
            return { ...state, perio: null };
        default: 
            return state; 
    } 
}