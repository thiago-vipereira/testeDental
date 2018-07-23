import { 
    FETCH_AUDIT,
} from '../actions/audit';
 
export default function(state = {}, action) { 
    switch(action.type) { 
        case FETCH_AUDIT: 
            return { ...state, audit: action.payload };
        default: 
            return state; 
    } 
}