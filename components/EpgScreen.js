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

/**
 * The top level EPG view screen.
 */

import React from 'react';
import { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import EpgList from './EpgList';
import { setEpgDay, setEpgStation } from '../reducers/actions';

class EpgScreen extends Component {

    renderItem({ item, index }) {
        return (
            <Button>{item}</Button>
        );
    }

    render() {

        const { days, stationNames, currentDay, currentStation, setEpgDay, setEpgStation, navigation } = this.props;
        const currentStationIndex = stationNames.indexOf(currentStation);
        const sliderWidth = Dimensions.get("window").width;
        const itemWidth = sliderWidth * 0.5;

        return (
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
                    <EpgList
                        navigation={navigation}
                    />
                </View>
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