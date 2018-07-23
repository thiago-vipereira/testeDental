import { 
    FETCH_DENTAL_STATUS,
    EDIT_DENTAL_STATUS,
    CLEAR_DENTAL_STATUS,
} from '../actions/dentalStatus';
 
export default function(state = {}, action) { 
    switch(action.type) { 
        case FETCH_DENTAL_STATUS:
            return { ...state, dentalStatus: action.payload };
        case EDIT_DENTAL_STATUS: 
            return { ...state, dentalStatus: action.payload };
        case CLEAR_DENTAL_STATUS:
            return { ...state, dentalStatus: null };
        default: 
            return state; 
    } 
}