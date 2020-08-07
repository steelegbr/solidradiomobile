/**
 * The top level EPG view screen.
 */

import React from 'react';
import { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import PlayerOverlay from './PlayerOverlay';
import EpgList from './EpgList';
import { setEpgDay, setEpgStation } from '../reducers/actions';

class EpgScreen extends Component {

    renderItem({ item, index }) {
        return(
            <Button>{item}</Button>
        );
    }

    render() {

        const { days, stationNames, currentDay, currentStation, setEpgDay, setEpgStation } = this.props;
        const currentStationIndex = stationNames.indexOf(currentStation);
        const sliderWidth = Dimensions.get("window").width;
        const itemWidth = sliderWidth * 0.5;

        return(
            <View>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={stationNames}
                    renderItem={this.renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    loop={true}
                    firstItem={currentStationIndex}
                    onSnapToItem={(index) => {
                        setEpgStation(stationNames[index]);
                    }}
                />
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={days}
                    renderItem={this.renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    loop={true}
                    firstItem={currentDay}
                    onSnapToItem={setEpgDay}
                />
                <View style={styles.list}>
                    <EpgList />
                </View>
                <PlayerOverlay />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    list: {
        height: Dimensions.get("window").height - 250
    }
});

const mapStateToProps = state => {
    return {
        days: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ],
        stationNames: state.stationNames,
        currentDay: state.epg.currentDay,
        currentStation: state.epg.currentStation
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setEpgDay: (index) => dispatch(setEpgDay(index)),
        setEpgStation: (stationName) => dispatch(setEpgStation(stationName))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EpgScreen);