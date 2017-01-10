/**
 * Created by kate on 04/01/17.
 */
import {
    GENRES_REQUEST,
    GENRES_RECEIVE,
    GENRES_FAILURE
}  from '../constants/ActionTypes';
import { responseToGenres } from '../helpers/responseToGenres';
import fetch from 'isomorphic-fetch';

import * as Api from '../api';

export const requestGenres = ()=> ({
    type: GENRES_REQUEST
});

export const receiveGenres = (json)=> ({
    type: GENRES_RECEIVE,
    genres: json,
    receivedAt: Date.now()
});

export const failureGenres = (msg)=>({
    type: GENRES_FAILURE,
    msg: msg
});

export const fetchGenres = (genre) => dispatch => {
    dispatch(requestGenres());
    return fetch(Api.getGenresList())
        .then(response => {
            if (!response.ok) {
                throw new Error('Fetching genres error');
            } else {
                return response;
            }
        })
        .then(response => response.json())
        .then(json => {
            let genres = responseToGenres(json, 10);
            dispatch(receiveGenres(genres))
        })
        .catch(err => dispatch(failureGenres(err)))
};

