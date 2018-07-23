import {
  SAVE_DOCUMENT,
  FETCH_DOCUMENT,
  GET_PATIENT_DOCUMENT
} from '../actions/patientDocument';

export default function(state = {}, action) { 
  switch(action.type) { 
      case SAVE_DOCUMENT:
          return { ...state, selectedDocument: action.payload };
      case FETCH_DOCUMENT:
          return { ...state, allDocument: action.payload };
      case GET_PATIENT_DOCUMENT:
          return { ...state, selectedDocument: action.payload };
      default: 
          return state;
  } 
}