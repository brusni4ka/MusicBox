/**
 * Created by kate on 06/01/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Player from '../components/Player';
import {pauseTrack, playTrack, togglePlay, changeSong} from '../action/playerActions';
import {bindActionCreators} from 'redux';

class PlayerContainer extends Component {

    render() {
        const {activeTrack} = this.props;
        return (
            <div>
                {activeTrack ? <Player {...this.props} /> : null}
            </div>
        );
    }
}


const mapStateToProps = ({player})=>({
    activeTrack: player.activeTrack,
    play: player.play,
    activeTrackId: player.trackId
});

const mapDispatchToProps = (dispatch)=> (
    bindActionCreators({playTrack, pauseTrack, togglePlay, changeSong}, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
