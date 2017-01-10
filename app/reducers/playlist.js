import {
    PLAYLIST_SET,
} from '../constants/ActionTypes';

const initialState = {
    list: [],
    genre:''
};

const player = (state = initialState, action)=> {
    switch (action.type) {
        case PLAYLIST_SET:
        {
            return {
                ...state,
                list: action.playlist,
                genre: action.genre
            };
        }
    }
    return state;
};

export default player;
