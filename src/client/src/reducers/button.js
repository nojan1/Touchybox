
import { BUTTON_PRESSED } from '../actions/button';

export default function buttons(state = {}, action) {
  switch (action.type) {    
    case BUTTON_PRESSED:
        const buttonName = action.button;

        let newState = {};
        newState[buttonName] = state.hasOwnProperty(buttonName) 
          ? state[buttonName] + 1
          : 1;

        return {...state, ...newState};
    default:
      return state;
  }
}
