
import { LOADED_DRINKS } from '../actions/drinks';

export default function counter(state = {}, action) {
  switch (action.type) {    
    case LOADED_DRINKS:
        return {...state, ...action.payload};
    default:
      return state;
  }
}
