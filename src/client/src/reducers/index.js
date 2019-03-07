// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import xkcd from './xkcd';
import quote from './quote';
import weather from './weather';
import buttons from './button'
import notifications from './notifications';
import drinks from './drinks';

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    xkcd,
    quote,
    weather,
    buttons,
    notifications,
    drinks
  });
}
