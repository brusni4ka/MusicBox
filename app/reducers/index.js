import {combineReducers} from 'redux';
import songs from './songs';
import genres from './genres';
import player from './player';
import playlist from './playlist';

const reducers = {
    songs,
    genres,
    player,
    playlist
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
