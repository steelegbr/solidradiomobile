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

import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import { StyleSheet, Dimensions, View } from 'react-native'
import OnAirCard from './OnAirCard';
import NowPlayingCard from './NowPlayingCard';

class PlayerCarousel extends Component {

    /**
     * Renders the carousel items for a station.
     */

    renderStationItem({ item, index }) {

        const carouselItem = item[0];
        const station = item[1];

        switch (index) {
            case 0:
                return (<OnAirCard onAir={carouselItem} station={station} />);
            case 1:
                return (<NowPlayingCard nowPlaying={carouselItem} station={station} />);
        }

        return null;

    }

    /**
     * Renders the carousel items for podcast.
     */

    renderPodcastItem({ item, index }) {

    }

    render() {
        const { renderMethod, carouselItems } = this.props;
        const sliderWidth = Dimensions.get("window").width;
        const itemWidth = sliderWidth * 0.8;

        switch (renderMethod) {
            case "renderStationItem":
                return (
                    <View style={carouselStyles.parent}>
                        <Carousel
                            ref={(c) => { this._carousel = c; }}
                            data={carouselItems}
                            renderItem={this.renderStationItem}
                            sliderWidth={sliderWidth}
                            itemWidth={itemWidth}
                            windowSize={1}
                            loop={false}
                            style={carouselStyles.test}
                        />
                    </View>
                );
            case "renderPodcastItem":
            default:
                return null;
        }


    }

}

const carouselStyles = StyleSheet.create({
    parent: {
        flex: 1,
        alignItems: "stretch",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
});

const mapStateToProps = state => {

    // Work out the current item type

    const currentItem = state.player.playlist[state.player.currentItem];
    let items = [];

    if (currentItem !== undefined && currentItem.type == 'station') {

        const station = state.stations[currentItem.name];

        return {
            renderMethod: "renderStationItem",
            carouselItems: [[station.onAir, station], [station.nowPlaying, station]],
            station: station
        }

    } else {
        return {
            renderMethod: renderPodcastItem,
            carouselItems: []
        }
    }


};

const mapDispatchToProps = dispatch => {

};

export default connect(mapStateToProps)(PlayerCarousel);