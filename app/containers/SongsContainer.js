import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSongs, loadMoreSongs} from '../action/songsActions';
import {setTrack, togglePlay} from '../action/playerActions'
import {setPlaylist} from '../action/playlistActions'

import {bindActionCreators} from 'redux';
import  SongsList from '../components/SongsList';
import  Loader from '../components/Loader';

class SongsLayout extends Component {

    componentDidMount() {
        const {playlist, params, fetchSongs} = this.props;

        if (!playlist || playlist.length === 0) {
            fetchSongs(params.genre);
        }
        fetchSongs(params.genre);
    }

    //Fetching new songs in case of changing route
    componentWillReceiveProps(nextProps) {
        const {genre} = nextProps.params;
        if (this.props.params.genre !== genre) {
            nextProps.fetchSongs(genre);
        }
    }

    render() {
        const { showLoader } = this.props;
        return (
            <div className="songs">
                <div className="container">
                    <SongsList  {...this.props}/>
                    { showLoader ? <Loader/> : null}
                </div>
            </div>
        )
    };
}


const mapStateToProps = ({songs, playlist, player})=>({
    playlist: songs.list,
    nextUrl: songs.next_href,
    showLoader: songs.isFetching,
    playlistGenre: playlist.genre,
    activeTrackId: player.trackId,
    play: player.play
});

const mapDispatchToProps = (dispatch)=> (
    bindActionCreators({
        fetchSongs, 
        loadMoreSongs, 
        setTrack, 
        setPlaylist,
        togglePlay
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SongsLayout)

 