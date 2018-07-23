import {
  SAVE_ANAMNESIS,
  FETCH_ANAMNESIS,
  GET_PATIENT_ANAMNESIS
} from '../actions/patientAnamnesis';

export default function(state = {}, action) { 
  switch(action.type) { 
      case SAVE_ANAMNESIS:
          return { ...state, selectedAnamnesis: action.payload };
      case FETCH_ANAMNESIS:
          return { ...state, allAnamnesis: action.payload };
      case GET_PATIENT_ANAMNESIS:
          return { ...state, selectedAnamnesis: action.payload };
      default: 
          return state;
  } 
}