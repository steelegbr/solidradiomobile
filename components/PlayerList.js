/**
    Solid Radio Mobile App
    Copyright (C) 2020-2021 Marc Steele

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

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

                return (
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