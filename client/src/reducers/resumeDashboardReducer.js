import {
  UPDATE_GRID,
  GET_GRID
} from '../actions/auth';

export default function(state = {loaded: false}, action) { 
  switch(action.type) {
      case UPDATE_GRID: 
          return { ...state, currentGrid: action.payload };
      case GET_GRID: 
          return { ...state, currentGrid: action.payload, loaded: true };
      default: 
          return state; 
  } 
}