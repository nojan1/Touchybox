
import { LOADED_QUOTE } from '../actions/quote';

export default function counter(state = {}, action) {
  switch (action.type) {    
    case LOADED_QUOTE:
        return {...state, ...action.payload};
    default:
      return state;
  }
}
