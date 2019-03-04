
import config from '../constants/config';

export const ADDED_NOTIFICATION = 'ADDED_NOTIFICATION';
export const REMOVED_NOTIFICATION = 'REMOVED_NOTIFICATION';
export const CLEARED_NOTIFICATIONS = 'CLEARED_NOTIFICATIONS';

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

export const addNotification = (notification) => async (dispatch, getState) => {
    notification.id = uuidv4();

    await fetch(config.API + '/notification', {
        method: 'POST',
        body: JSON.stringify(notification),
        headers: {
            "Content-Type": "application/json",
        }
    });

    dispatch({
        type: ADDED_NOTIFICATION,
        payload: notification
    });
}

export const removeNotification = (notification) => async (dispatch, getState) => {
    await fetch(config.API + '/notification/' + notification.id, {
        method: 'DELETE'
    })
    .then(res => dispatch({
        type: REMOVED_NOTIFICATION,
        payload: notification
    }));
}

export const clearNotifications = () => async (dispatch, getState) => {
    await fetch(config.API + '/notification/all', {
        method: 'DELETE'
    })
    .then(res => dispatch({
        type: CLEARED_NOTIFICATIONS
    }));
}
