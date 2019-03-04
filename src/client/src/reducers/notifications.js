import _ from 'lodash';
import { ADDED_NOTIFICATION, REMOVED_NOTIFICATION } from '../actions/notifications';

export default function notifications(state = {}, action) {
    switch (action.type) {
        case ADDED_NOTIFICATION:
            return { ...state, [action.payload.id]: action.payload };
        case REMOVED_NOTIFICATION:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
