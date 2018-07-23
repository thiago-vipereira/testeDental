import {
  CREATE_MODEL,
  GET_MODEL,
  FETCH_MODELS,
  FETCH_TYPE_MODELS,
  UPDATE_MODEL,
  DELETE_MODEL,
  GET_MENTION
} from '../actions/model';

export default function(state = {}, action) { 
  switch(action.type) { 
      case CREATE_MODEL: 
          return { ...state, selectedModel: action.payload };
      case GET_MODEL: 
          return { ...state, selectedModel: action.payload };
      case FETCH_MODELS: 
          return { ...state, modelsById: action.payload };
      case FETCH_TYPE_MODELS: 
          return { ...state, modelsByType: action.payload };
      case UPDATE_MODEL:
          return { ...state, selectedModel: action.payload };
    case DELETE_MODEL: 
          return { ...state, selectedModel: action.payload };
    case GET_MENTION: 
          return { ...state, mention: action.payload };
      default: 
          return state; 
  } 
}