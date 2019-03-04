
import config from '../constants/config';
import { addNotification } from './notifications';

export const LOADED_XKCD = 'LOADED_XKCD';

export const loadXkcd = () => async (dispatch, getState) => {
    fetch(config.API + '/xkcd')
        .then(x => x.json())
        .then(async x => {
            const state = getState()
            
            if(!state.xkcd.num || x.num > state.xkcd.num){
                await addNotification({
                    color: '#ffd800',
                    slide: 'Xkcd',
                    text: 'New XKCD: ' + x.title
                })(dispatch, getState);
            }

            dispatch({
                type: LOADED_XKCD,
                payload: x
            });
        });
}
