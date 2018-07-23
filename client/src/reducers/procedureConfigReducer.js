import { 
    CREATE_LIST,
    FETCH_LISTS,
    GET_LIST,
    UPDATE_PROCEDURE,
    DELETE_LIST,
    FETCH_GROUPS,
    FETCH_PROCEDURES,
    SELECTED_GROUP,
    GET_PROCEDURE,
} from '../actions/procedure';
 
export default function(state = {}, action) { 
    switch(action.type) { 
        case CREATE_LIST: 
            return { ...state, selectedProcedure: action.payload };
        case FETCH_LISTS: 
            return { ...state, proceduresById: action.payload };
        case GET_LIST: 
            return { ...state, selectedProcedure: action.payload };
        case UPDATE_PROCEDURE:
            return { ...state, selectedProcedure: action.payload };
        case DELETE_LIST: 
            return { ...state, selectedProcedure: action.payload };
        case FETCH_GROUPS:
            return { ...state, fetchGroups: action.payload };
        case FETCH_PROCEDURES:
            return { ...state, fetchProcedures: action.payload };
        case SELECTED_GROUP:
            return { ...state, selectedGroup: action.payload };
        case GET_PROCEDURE:
            return { ...state, getProcedure: action.payload };
        default: 
            return state; 
    } 
}