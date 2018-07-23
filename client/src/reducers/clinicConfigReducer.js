import { 
    FETCH_CLINIC_USERS,
    GET_CLINIC_USER,
    CLEAR_USER
} from '../actions/users';

import { 
    CREATE_DENTIST,
    FETCH_DENTISTS,
    GET_DENTIST,
    CLEAR_DENTIST
} from '../actions/dentists';
 
export default function(state = {}, action) { 
    switch(action.type) { 
        case FETCH_CLINIC_USERS: 
            return { ...state, usersById: action.payload };
        case GET_CLINIC_USER: 
            return { ...state, selectedUser: action.payload };
        case CLEAR_USER:
            return { ...state, selectedUser: null };
        case CREATE_DENTIST: 
            return { ...state, selectedDentist: action.payload };
        case FETCH_DENTISTS: 
            return { ...state, dentistsById: action.payload };
        case GET_DENTIST: 
            return { ...state, selectedDentist: action.payload };
        case CLEAR_DENTIST:
            return { ...state, selectedDentist: null };
        default: 
            return state; 
    } 
}