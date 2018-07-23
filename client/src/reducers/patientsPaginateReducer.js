import {
	PAGINATE_PATIENTS
} from '../actions/patientsSearch';

export default function(state = { active: { array: [] , length: 0}, filed: { array: [] , length: 0}  }, action) {
	if (action.type === PAGINATE_PATIENTS) {
        if (action.status)
            return {...state, active: action.payload};
        else
            return {...state, filed: action.payload};
    }
    else {
        return state;
	}
}