import {
    GET_ODONTOGRAM, 
    FETCH_ODONTOGRAM,
    EDIT_ODONTOGRAM,
    CLEAR_ODONTOGRAM,
} from '../actions/odontogram';
 
export default function(state = {}, action) { 
    switch(action.type) {
        case GET_ODONTOGRAM:
        return { ...state, odontogram: action.payload };
        case FETCH_ODONTOGRAM:
            return { ...state, odontograms: action.payload };
        case EDIT_ODONTOGRAM: 
            return { ...state, odontogram: action.payload };
        case CLEAR_ODONTOGRAM:
            return { ...state, odontogram: null };
        default: 
            return state; 
    } 
}