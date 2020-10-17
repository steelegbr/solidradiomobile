/**
 * The top level EPG view screen.
 */

import React from 'react';
import { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import PresentersList from './PresentersList';
import { setPresentersStation } from '../reducers/actions';

class PresentersScreen extends Component {

    renderItem({ item, index }) {
        return(
            <Button>{item}</Button>
        );
    }

    render() {

        const { days, stationNames, currentDay, currentStation, setEpgDay, setPresentersStation, navigation } = this.props;
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
                        setPresentersStation(stationNames[index]);
                    }}
                />
                <View style={styles.list}>
                    <PresentersList
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
        stationNames: state.stationNames,
        currentStation: state.presenters.currentStation
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPresentersStation: (stationName) => dispatch(setPresentersStation(stationName))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentersScreen);