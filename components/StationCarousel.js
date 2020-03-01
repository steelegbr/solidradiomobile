import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import { StyleSheet, Dimensions, View } from 'react-native'
import StationCard from './StationCard';

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
        const itemWidth = sliderWidth * 0.9;
        return(
            <View style={carouselStyles.parent}>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={stations}
                    renderItem={this._renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    windowSize={1}
                />
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

    for (var stationName in state.stations) {
        stations.push(state.stations[stationName]);
    }

    // Send it down the line

    return {
        stations: stations
    };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps)(StationCarousel);