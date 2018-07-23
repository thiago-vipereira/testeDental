import {
    INPUT_AUTO_COMPLETE,
    PATIENT_AUTO_COMPLETE,
} from '../actions/component';

export default function(state = {}, action) { 
    switch(action.type) { 
        case INPUT_AUTO_COMPLETE: 
            return { ...state, imputAutoComplete: action.payload };
        case PATIENT_AUTO_COMPLETE: 
            return { ...state, patientAutoComplete: action.payload };    
        default: 
            return state; 
    } 
}