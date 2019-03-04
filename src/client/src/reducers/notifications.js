import _ from 'lodash';
import { ADDED_NOTIFICATION, REMOVED_NOTIFICATION, CLEARED_NOTIFICATIONS } from '../actions/notifications';

export default function notifications(state = {}, action) {
    switch (action.type) {
        case ADDED_NOTIFICATION:
            return { ...state, [action.payload.id]: action.payload };
        case REMOVED_NOTIFICATION:
            return _.omit(state, action.payload);
        case CLEARED_NOTIFICATIONS:
            return {};
        default:
            return state;
    }
}
