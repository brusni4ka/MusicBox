/**
 * Created by kate on 19/12/16.
 */
import React, {Component} from 'react';
import Navbar from '../components/Navbar';
import Toolbar from '../components/Toolbar';
import PlayerContainer from './PlayerContainer';

import {connect} from 'react-redux';
import {fetchGenres} from '../action/genresActions';
import {bindActionCreators} from 'redux';


class App extends Component {

    componentDidMount() {
        this.props.fetchGenres();
    }

    render() {
        const {children, genres} = this.props;
        return (
            <div>
                <header className="main-nav">
                    <Navbar/>
                    <Toolbar genres={ genres }/>
                </header>
                <main className="container">
                    {children}
                </main>
                <PlayerContainer/>
            </div>
        );
    }
}

const mapStateToProps = ({genres})=>({
    genres: genres.list
});

const mapDispatchToProps = (dispatch)=> (
    bindActionCreators({fetchGenres}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(App)
 

