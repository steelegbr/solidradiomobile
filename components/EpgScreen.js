/**
 * The top level EPG view screen.
 */

import React from 'react';
import { Component } from 'react';
import { View } from 'react-native'
import { Button, Menu } from 'react-native-paper';
import { connect } from 'react-redux';
import PlayerOverlay from './PlayerOverlay';

class EpgScreen extends Component {

    visible = false;

    setVisible(state) {
        this.visible = state;
    };
    

    render() {

        const { days, stationNames } = this.props;

        return(
            <View>
                <Menu
                    visible={this.visible}
                    onDismiss={this.setVisible(false)}
                    anchor={<Button onPress={this.setVisible(true)}>{this.currentStation}</Button>}
                >
                    {stationNames.map((day, index) => {
                        return <Menu.Item>{day}</Menu.Item>
                    })}
                </Menu>
                <PlayerOverlay />
            </View>
        );
    }

}

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
        stationNames: state.stationNames
    };
}

const mapDispatchToProps = dispatch => {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EpgScreen);