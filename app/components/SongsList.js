/**
 * Created by kate on 04/01/17.
 */
import React, {Component} from 'react';
import SongCard from './SongCard';
import {debounce} from '../helpers/debounce';
import ReactDOM, {findDOMNode} from 'react-dom';

class SongsList extends Component {

    constructor(props) {
        super(props);
        this.scrollHandler = debounce(this.updateViewport, 500).bind(this);
    }


    updateViewport() {
        const {loadMoreSongs, nextUrl} = this.props;
        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 200)) {
            if (nextUrl) {
                loadMoreSongs(nextUrl);
            }
        }
    }


    componentWillReceiveProps(nextProps) {
        const {setPlaylist, playlist, showLoader, playlistGenre} = this.props;
        if (nextProps.params.genre != playlistGenre || showLoader)return;
        setPlaylist({
            playlist: playlist,
            genre: playlistGenre
        });
    }


    componentDidMount() {
        window.addEventListener('scroll', this.scrollHandler, false);
        window.addEventListener('resize', this.scrollHandler, false);

    }

    componentWillUnmount() {
        window.addEventListener('scroll', this.scrollHandler, false);
        window.addEventListener('resize', this.scrollHandler, false);
    }
    
    


    render() {
        const {playlist, params, playlistGenre} = this.props;
        let {activeTrackId} = this.props;
        
        if (params.genre != playlistGenre) {
            activeTrackId = null;
        }
        return (
            <div className="row">
                { !!playlist && playlist.map((el, key)=>
                    <SongCard key={key}
                        {...this.props}
                              trackId={key}
                              params={el}
                    />
                )}
            </div>
        );
    }
}

export default SongsList;