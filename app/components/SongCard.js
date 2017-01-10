/**
 * Created by kate on 03/01/17.
 */
import React, {Component} from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import '../../assets/styles/components/songcard.css'

class SongCard extends Component {

    clickHolder(e) {
        const {playlist, setTrack, setPlaylist, trackId, params, playlistGenre} = this.props;
        e.preventDefault();

        setTrack(params, trackId);
        setPlaylist({
            playlist: playlist,
            genre: playlistGenre
        });
    }


    render() {
        const {artwork_url, title} = this.props.params;
        const {username} = this.props.params.user;
        const {activeTrackId, trackId, play} = this.props;
        let cardClassName = (activeTrackId === trackId) ? 'audio-holder active' : 'audio-holder';
        let btnClassName = (activeTrackId === trackId && play)  ? 'fa fa-pause play-btn':'fa fa-play play-btn';
       
        return (
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <div className={cardClassName}>
                    <div className="view effect">
                        <div>
                            <img src={artwork_url}/>
                        </div>
                        <div className="mask">
                            <a href="" onClick={(e)=>this.clickHolder(e)} className={btnClassName}
                               aria-hidden="true"></a>
                        </div>
                        <div className="content">
                            <a href="#" className="info" title="Full Image">Full Image</a>
                        </div>
                    </div>
                    <div className="audio-info">
                        <div className="autor">Author: {username}</div>
                        <div className="song-name">Song: {title}</div>
                    </div>
                </div>
            </div>
        )
    }

}


export default SongCard;