/**
 * Created by kate on 03/01/17.
 */
import {
    SONGS_REQUEST,
    SONGS_RECEIVE,
    SONGS_FAILURE,
    NEXT_SONGS_RECEIVE
}  from '../constants/ActionTypes'

const initialState = {
    isFetching: false,
    list: [],
    next_href: null
};

const songs = (state = initialState, action)=> {
    switch (action.type) {
        case SONGS_REQUEST: {
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }
        }
        case SONGS_RECEIVE: {
            console.log({
                ...state,
                isFetching: false,
                didInvalidate: false,
                list: action.songs,
                next_href: action.next_href
            });
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                list: action.songs,
                next_href: action.next_href
            }
        }

        case NEXT_SONGS_RECEIVE: {
            debugger;
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                list: state.list.concat(action.songs),
                next_href: action.next_href
            }
        }
            
            
        case SONGS_FAILURE:
        {
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


export  default songs;