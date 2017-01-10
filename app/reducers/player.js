/**
 * Created by kate on 05/01/17.
 */
import {
    TRACK_PLAY,
    TRACK_PAUSE,
    TRACK_SET,
} from '../constants/ActionTypes';

const initialState = {
    activeTrack: null,
    trackId: null,
    play: false
};

const player = (state = initialState, action)=> {
    switch (action.type) {
        case TRACK_SET: {
            return {...state, 
                activeTrack: action.track,
                trackId: action.trackId,
                play: false
            };
        }
        case TRACK_PLAY: {
            return {...state, play: true};
        }
        case TRACK_PAUSE: {
            return {...state, play: false};
        }

    }
    return state;
};

export default player; 
