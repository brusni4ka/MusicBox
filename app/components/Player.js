import React, {Component} from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import {offsetLeft} from '../helpers/offsetLeft';

import {
    NEXT,
    PREV,
    SHUFFLE
} from'../constants/ActionTypes';

class Player extends Component {

    constructor() {
        super();
        this.state = {
            duration: null,
            currentTime: null,
            volume: '0.45',
            muteOn: false,
            loop: false,
            playPercent: null
        };

        this.handleSongPlaying = this.handleSongPlaying.bind(this);
        this.handleMediaEnd = this.handleMediaEnd.bind(this);
        this.handleCanPlay = this.handleCanPlay.bind(this);
    }


    millisecondsToTime(milli) {
        let milliseconds = milli % 1000;
        let seconds = Math.floor((milli / 1000) % 60);
        let minutes = Math.floor((milli / (60 * 1000)) % 60);
        return minutes + ":" + seconds + "." + milliseconds;
    }


    handleSongPlaying(e) {
        const audio = e.target;
        let playPercent = 100 * (audio.currentTime / audio.duration);
        this.setState({
            duration: audio.duration,
            currentTime: audio.currentTime,
            playPercent: playPercent
        });
    }

    handleMediaEnd() {
        const {pauseTrack} = this.props;
        pauseTrack();
        this.changeSongHolder(NEXT);
    }

    handleCanPlay() {
        const {playTrack} = this.props;
        playTrack();
    }


    changeSongHolder(type) {
        const {changeSong} = this.props;
        changeSong(type);
    }

    componentDidMount() {
        const audioElement = ReactDOM.findDOMNode(this.refs.audio);
        if (!audioElement) {
            return;
        }
        const {activeTrack} = this.props;

        if (activeTrack) {
            audioElement.play();
        } else {
            audioElement.pause();
        }

        //Bind events
        audioElement.volume = this.state.volume;
        audioElement.addEventListener('timeupdate', this.handleSongPlaying);
        audioElement.addEventListener('ended', this.handleMediaEnd);
        audioElement.addEventListener('canplay', this.handleCanPlay);


    };


    componentWillUnmount() {
        const audioElement = ReactDOM.findDOMNode(this.refs.audio);
        audioElement.removeEventListener('timeupdate', this.handleSongPlaying);
        audioElement.removeEventListener('ended', this.handleMediaEnd);
        audioElement.removeEventListener('canplay', this.handleCanPlay);
    }

    toggleMute() {
        this.setState({muteOn: !this.state.muteOn});
    }

    toggleLoop() {
        this.setState({loop: !this.state.loop});
    }

    volumeSet(e) {
        const audioElement = ReactDOM.findDOMNode(this.refs.audio);
        let volume = e.target.value;
        audioElement.volume = volume;
        this.setState({volume})
    }


    playFromPosition(e) {
        const audioElement = ReactDOM.findDOMNode(this.refs.audio);
        const seekBar = ReactDOM.findDOMNode(this.refs.seekBar);
        const diff = e.clientX - offsetLeft(seekBar);
        const pos = diff < 0 ? 0 : diff;
        let percent = pos / seekBar.offsetWidth;
        percent = percent > 1 ? 1 : percent;
        audioElement.currentTime = Math.floor(percent * this.state.duration);
    }


    componentWillReceiveProps(nextProps) {
        const audioElement = ReactDOM.findDOMNode(this.refs.audio);
        const {play, activeTrackId} =  this.props;
        
        if (nextProps.activeTrackId !== activeTrackId) {
            this.stateToInitial();
        }
        if (play) {
            audioElement.pause();
        } else {
            audioElement.play();
        }
    }


    stateToInitial() {
        this.setState({
            duration: 0,
            currentTime: 0,
            loop: false,
            playPercent: 0
        });
    }


    renderVolume() {
        let {volume, muteOn} = this.state;
        let volumeClassName = 'fa fa-volume-down';
        volume = muteOn ? '0' : volume;

        if (volume === '0') {
            volumeClassName = 'fa fa-volume-off'
        } else if (volume >= '0.75') {
            volumeClassName = 'fa fa-volume-up'
        }
        return (
            <div className="volume flex">
                <div onClick={ ()=>this.toggleMute()} className=" volume"><i className={volumeClassName}
                                                                             aria-hidden="true"></i></div>
                <input className="range" id="volume" type="range" min="0" max="1" step="0.01" value={volume}
                       onChange={(e)=>this.volumeSet(e)}
                />
            </div>)
    }


    render() {
        const {togglePlay, play} = this.props;
        const {stream_url, title, user}= this.props.activeTrack;
        const {username, avatar_url} = user;
        let {playPercent, muteOn, loop} = this.state;
        let playPauseClassName = play ? 'fa fa-pause' : 'fa fa-play';

        const prevSong = this.changeSongHolder.bind(this, PREV);
        const nextSong = this.changeSongHolder.bind(this, NEXT);


        return (
            <div id="player">
                <div className="player-holder flex">
                    <audio id="audio"
                           ref="audio"
                           src={stream_url+'?client_id=f4323c6f7c0cd73d2d786a2b1cdae80c'}
                           data-reactid=".0.2.0"
                           muted={muteOn}
                           loop={loop}
                    />
                </div>

                <div className="player-holder flex">
                    <div className="track-info flex">
                        <img className="player-image" src={avatar_url}/>
                        <div className="track-detail">
                            <p className="tile">{title}</p>
                            <p className="artist">{username}</p>
                        </div>
                    </div>
                    <div className="player-controls flex">
                        <div onClick={()=>this.toggleLoop()}
                             className={ loop ? 'player-controls-repeat active':'player-controls-repeat'}>
                            <i className="fa fa-repeat"></i></div>
                        {/*Previous Song button*/}
                        <div onClick={prevSong} className=" player-controls-prev"><i
                            className="fa fa-backward"></i></div>
                        {/*Play/Pause button*/}
                        <div onClick={togglePlay} className="player-controls-play active">
                            <i className={playPauseClassName}></i>
                        </div>
                        {/*Next Song button*/}
                        <div onClick={nextSong} className="player-controls-next"><i className="fa fa-forward"></i></div>
                    </div>
                    {this.renderVolume()}
                    <div ref="seekBar" className="duration" onClick={(e)=>this.playFromPosition(e)}>
                        <span className="total"></span>
                        <span className="current" style={{width: playPercent + '%'}}></span>
                    </div>
                </div>
            </div>
        );
    }


}


export default Player;



