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
 * Presenter listings for a given station.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import { List, Text } from 'react-native-paper';
import { loadStationPresenters } from '../reducers/actions';

class PresentersList extends Component {

    render() {

        const { loaded, presenters, navigation, stationName, loadStationPresenters } = this.props;

        if (loaded) {

            return (
                <FlatList
                    data={presenters}
                    renderItem={({ item }) => {

                        return (
                            <List.Item
                                title={item.name}
                                left={props => <List.Icon icon={{ uri: item.image }} />}
                                onPress={() => {
                                    navigation.push('PresenterDetail', {
                                        presenter: item
                                    });
                                }}
                            />
                        )

                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            );

        } else {

            // Trigger a load

            loadStationPresenters(stationName);

            // Show the loading screen

            return (
                <View>
                    <ActivityIndicator
                        style={styles.spinner}
                        size="large"
                    />
                    <Text
                        style={styles.text}
                    >
                        Loading top talent...
                    </Text>
                </View>
            );

        }



    }

}

const styles = StyleSheet.create({
    text: {
        flex: 0,
        width: "100%",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        padding: 20
    },
    spinner: {
        flex: 1,
        margin: 50
    },
    button: {
        margin: 20
    }
});

const mapStateToProps = (state, ownProps) => {

    // Work out if we have presenters or not

    const currentStation = state.presenters.currentStation;

    if (currentStation in state.presenters.stations) {
        return {
            loaded: true,
            presenters: state.presenters.stations[currentStation],
            navigation: ownProps.navigation,
            stationName: currentStation
        }
    } else {
        return {
            loaded: false,
            presenters: [],
            navigation: ownProps.navigation,
            stationName: currentStation
        }
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        loadStationPresenters: (stationName) => dispatch(loadStationPresenters(stationName))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentersList);