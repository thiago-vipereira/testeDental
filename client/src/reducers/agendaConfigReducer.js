import { 
    FETCH_AGENDA_CONFIG,
    EDIT_AGENDA_CONFIG,
    DENTIST_SCHEDULE,
} from '../actions/agendaConfig';
 
export default function(state = {}, action) { 
    switch(action.type) { 
        case DENTIST_SCHEDULE: 
            return { ...state, dentistSchedule: action.payload };
        case FETCH_AGENDA_CONFIG: 
            return { ...state, agendaConfig: action.payload };
        case EDIT_AGENDA_CONFIG: 
            return { ...state, agendaConfig: action.payload };
        default: 
            return state; 
    } 
}