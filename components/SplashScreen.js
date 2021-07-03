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
import { StyleSheet, View, ActivityIndicator, Image } from 'react-native'
import { Button, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { initialLoad } from '../reducers/actions';

class SplashScreen extends Component {

    render() {
        const { loadingStatus, initialLoad } = this.props;

        if (loadingStatus == 'not_started' || loadingStatus == 'started' || loadingStatus == 'success') {

            return (
                <View style={splashStyles.parent}>
                    <Image
                        style={splashStyles.image}
                        source={require('../assets/Logo.png')}
                        resizeMode="contain"
                    />
                    <ActivityIndicator
                        style={splashStyles.spinner}
                        size="large"
                    />
                    <Text
                        style={splashStyles.text}
                    >
                        We won't be a moment...
                    </Text>
                </View>
            );

        } else {

            return (
                <View style={splashStyles.parent}>
                    <Image
                        style={splashStyles.image}
                        source={require('../assets/Logo.png')}
                        resizeMode="contain"
                    />
                    <Text
                        style={splashStyles.text}
                    >
                        Something went wrong trying to get a classic with every byte.
                    </Text>
                    <Button
                        mode="contained"
                        color="#FFFFFF"
                        style={splashStyles.button}
                        onPress={() => { initialLoad() }}
                    >
                        Try Again!
                    </Button>
                </View>
            );

        }
    }

}

const splashStyles = StyleSheet.create({
    parent: {
        flex: 1,
        alignItems: "stretch",
        flexDirection: "column",
        backgroundColor: "#7300AE",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        flex: 0,
        width: "100%",
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        padding: 20
    },
    spinner: {
        flex: 1
    },
    image: {
        flex: 3,
        width: "80%",
        height: undefined
    },
    button: {
        margin: 20
    }
});

const mapStateToProps = state => {
    return {
        loadingStatus: state.initialLoad
    };
};

const mapDispatchToProps = {
    initialLoad
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);