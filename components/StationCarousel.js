import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import { StyleSheet, Dimensions, View } from 'react-native'
import StationCard from './StationCard';
import PlayerOverlay from './PlayerOverlay';

class StationCarousel extends Component {

    _renderItem ({ item, index }) {
        return(
            <StationCard
                stationName={item.name}
            />
        );
    }

    render() {
        const { stations } = this.props;
        const sliderWidth = Dimensions.get("window").width;
        const itemWidth = sliderWidth * 0.8;
        return(
            <View style={carouselStyles.parent}>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={stations}
                    renderItem={this._renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    windowSize={1}
                    loop={true}
                />
                <PlayerOverlay />
            </View>
        );
    }

}

const carouselStyles = StyleSheet.create({
    parent: {
        flex: 1,
        alignItems: "stretch",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
});

const mapStateToProps = state => {

    // Convert the map of stations into an array

    let stations = new Array();

    for (var stationIndex in state.stationNames) {

        var stationName = state.stationNames[stationIndex];
        if (stationName in state.stations) {
            stations.push(state.stations[stationName]);
        }

    }

    // Send it down the line

    return {
        stations: stations
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StationCarousel);