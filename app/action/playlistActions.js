/**
 * Created by kate on 10/01/17.
 */
import {
    PLAYLIST_SET,
} from '../constants/ActionTypes';

export const setPlaylist = (payload)=>({
    type: PLAYLIST_SET,
    playlist:payload.playlist,
    genre:payload.genre
});
