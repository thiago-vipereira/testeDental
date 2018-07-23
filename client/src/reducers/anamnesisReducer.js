import {
  CREATE_ANAMNESIS,
  GET_ANAMNESIS,
  FETCH_ANAMNESIS,
  UPDATE_ANAMNESIS,
  DELETE_ANAMNESIS,
} from '../actions/anamnesis';

export default function(state = {}, action) { 
  switch(action.type) { 
      case CREATE_ANAMNESIS: 
          return { ...state, selectedAnamnesis: action.payload };
      case GET_ANAMNESIS: 
          return { ...state, selectedAnamnesis: action.payload };
      case FETCH_ANAMNESIS: 
          return { ...state, anamnesisById: action.payload };
      case UPDATE_ANAMNESIS:
          return { ...state, selectedAnamnesis: action.payload };
      case DELETE_ANAMNESIS: 
          return { ...state, selectedAnamnesis: action.payload };
      default: 
          return state; 
  } 
}