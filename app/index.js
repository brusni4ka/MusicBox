import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Routes} from  './routes';
import {Router, browserHistory} from 'react-router'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/';
import thunk from 'redux-thunk';

import '../assets/styles/all.css';

const store = createStore(rootReducer, applyMiddleware(thunk));

/*SC.initialize({
    client_id: 'f4323c6f7c0cd73d2d786a2b1cdae80c'
});


$(document).ready(function () {
    var page_size = 10;


    SC.get('/tracks', {limit: page_size, linked_partitioning: 1}).then(function (tracks) {
        console.log(tracks.next_href);
        $(tracks.collection).each(function (index, track) {
            console.log(track);

            $('#results').append($('<li></li>').html(track.title + ' - ' + track.genre))
                .append($(`<img alt="" src=${track.artwork_url}>`));
        })
    });
});*/

ReactDOM.render((
    <Provider store={store}>
        <Router routes={Routes} history={browserHistory}/>
    </Provider>
), document.getElementById('root'));

