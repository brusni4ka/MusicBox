import App from './containers/App';
import React, {Component} from 'react';
import {Route, IndexRedirect} from 'react-router'
import SongsContainer from './containers/SongsContainer' ;
import NotFound from './components/NotFound' ;

export const Routes = (
    <div>
        <Route path='/' component={App}>
            <IndexRedirect to='songs/rock' component={SongsContainer}/>
            <Route path='songs/:genre' component={SongsContainer}/>
        </Route>
        <Route path='*' component={NotFound} />
    </div>
);

