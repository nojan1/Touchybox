
import { BUTTON_PRESSED } from '../actions/button';

export default function buttons(state = {}, action) {
  switch (action.type) {    
    case BUTTON_PRESSED:
        return {...state, ...{pressedButton: action.button}};
    default:
      return state;
  }
}
