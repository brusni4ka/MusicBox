/**
 * Created by kate on 03/01/17.
 */
import {
    GENRES_REQUEST,
    GENRES_RECEIVE,
    GENRES_FAILURE
}  from '../constants/ActionTypes'

const initialState = {
    isFetching: false,
    list: []
};

const genres = (state = initialState, action)=> {
    switch (action.type) {
        case GENRES_REQUEST: {
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }
        }
        case GENRES_RECEIVE: {
            
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                list: action.genres
            }
        }
        case GENRES_FAILURE: {
            return {
                ...state,
                isFetching: false,
                didInvalidate: true
            }
        }
        default:
            return state;
    }
};


export default genres;