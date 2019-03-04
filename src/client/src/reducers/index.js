// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';
import xkcd from './xkcd';
import quote from './quote';
import weather from './weather';
import buttons from './button'
import notifications from './notifications';

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    counter,
    xkcd,
    quote,
    weather,
    buttons,
    notifications
  });
}
