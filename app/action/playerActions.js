import {
    TRACK_PLAY,
    TRACK_PAUSE,
    TRACK_SET,
    NEXT,
    PREV,
    SHUFFLE
} from '../constants/ActionTypes';

export const setTrack = (track, trackId)=>({
    type: TRACK_SET,
    track,
    trackId
});

export const pauseTrack = (track)=>({
    type: TRACK_PAUSE
});

export const playTrack = (track)=>({
    type: TRACK_PLAY
});

export const changeSong = (changeType)=>(dispatch, getState) => {
    const {player, playlist} = getState();
    const {trackId} = player;
    const currentsPlaylist = playlist.list;

    let newSongIndex;

    if (changeType === NEXT) {
        newSongIndex = trackId + 1;
    } else if (changeType === PREV) {
        newSongIndex = trackId - 1;
    } else if (changeType === SHUFFLE) {
        newSongIndex = Math.floor((Math.random() * currentsPlaylist.length - 1) + 0);
    }

    if (newSongIndex >= currentsPlaylist.length || newSongIndex < 0) {
        return null;
    }
    let newTrack = currentsPlaylist[newSongIndex];
    return dispatch(setTrack(newTrack, newSongIndex));
};

export const togglePlay = ()=>(dispatch,getState)=> {
    // Check current playing state
    const {player}= getState();
    const {play} = player;
    
    debugger;
    
    if (play) {
        dispatch(pauseTrack());
    } else {
        dispatch(playTrack());
    }
};