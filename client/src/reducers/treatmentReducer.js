import {
    GET_TREATMENT, 
    FETCH_TREATMENT,
    EDIT_TREATMENT,
    CLEAR_TREATMENT,
} from '../actions/treatment';
 
export default function(state = {}, action) { 
    switch(action.type) {
        case GET_TREATMENT:
        return { ...state, treatment: action.payload };
        case FETCH_TREATMENT:
            return { ...state, treatments: action.payload };
        case EDIT_TREATMENT: 
            return { ...state, treatment: action.payload };
        case CLEAR_TREATMENT:
            return { ...state, treatment: null };
        default: 
            return state; 
    } 
}