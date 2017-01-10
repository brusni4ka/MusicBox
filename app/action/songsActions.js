/**
 * Created by kate on 03/01/17.
 */
import {
    SONGS_REQUEST,
    SONGS_RECEIVE,
    SONGS_FAILURE,
    NEXT_SONGS_RECEIVE
}  from '../constants/ActionTypes';

import fetch from 'isomorphic-fetch';
import * as Api from '../api';

export const failureSongs = (msg)=>({
    type: SONGS_FAILURE
});

export const requestSongs = ()=> ({
    type: SONGS_REQUEST
});

export const receiveSongs = (json)=> {
    return ({
        type: SONGS_RECEIVE,
        songs: json.collection,
        next_href: json.next_href,
        receivedAt: Date.now()
    });

}
export const receiveNextSongs = (json)=> ({
    type: NEXT_SONGS_RECEIVE,
    songs: json.collection,
    next_href: json.next_href,
    receivedAt: Date.now()
});


export const fetchSongs = (genre) => dispatch => {
    dispatch(requestSongs());
    return fetch(Api.getSongsUrlByGenre(genre))
        .then(response => {
            if (!response.ok) {
                throw new Error('Fetching songs error');
            } else {
                return response;
            }
        })
        .then(response => response.json())
        .then(json => dispatch(receiveSongs(json)))
        .catch(err => dispatch(failureSongs(err)))
};

export const loadMoreSongs = (url) => dispatch=> {
    dispatch(requestSongs());
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Fetching songs error');
            } else {
                return response;
            }
        })
        .then(response => response.json())
        .then(json => dispatch(receiveNextSongs(json)))
        .catch(err => dispatch(failureSongs(err)))

};

