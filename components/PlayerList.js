import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import OnAirListItem from './OnAirListItem';
import NowPlayingListItem from './NowPlayingListItem';

const MODE_STREAM = 'MODE_STREAM';
const MODE_PODCAST = 'MODE_PODCAST';

class PlayerList extends Component {

    render() {

        const { mode } = this.props;

        switch (mode) {
            case MODE_STREAM:

                const { station } = this.props;

                return(
                    <View>
                        <OnAirListItem station={station} />
                        <NowPlayingListItem station={station} />
                    </View>
                );
            case MODE_PODCAST:
                return null;
        };

    }

}

const mapStateToProps = state => {

    // Work out the current item type

    const currentItem = state.player.playlist[state.player.currentItem];
    let items = [];

    if (currentItem !== undefined && currentItem.type == 'station') {
        
        const station = state.stations[currentItem.name];

        return {
            mode: MODE_STREAM,
            station: station
        }

    } else {
        return {
            mode: MODE_PODCAST
        }
    }
    
};

export default connect(mapStateToProps)(PlayerList);