import {
	CREATE_PATIENT,
	GET_PATIENT,
	CLEAR_PATIENT
} from '../actions/patientsCreation';

export default function(state = {}, action) {
	switch(action.type) {
		case CREATE_PATIENT:
			return { ...state, patientCreated: action.payload };
		case GET_PATIENT: 
			return { ...state, selectedPatient: action.payload };
		case CLEAR_PATIENT:
            return { ...state, selectedPatient: null };
		default:
			return state;
	}
}
