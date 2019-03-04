
import { LOADED_XKCD } from '../actions/xkcd';

export default function counter(state = {}, action) {
  switch (action.type) {    
    case LOADED_XKCD:
        return {...state, ...action.payload};
    default:
      return state;
  }
}
