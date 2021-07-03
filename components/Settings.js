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
import { View, StyleSheet } from 'react-native';
import { Title, Switch, Paragraph } from 'react-native-paper';
import { connect } from 'react-redux';
import { setDarkMode, setHighBitrate } from '../reducers/actions';

class Settings extends Component {

    render() {

        const { darkMode, highBitrate, styles, setDarkMode, setHighBitrate } = this.props;

        return (
            <View >
                <Title style={styles.header}>Settings</Title>
                <View style={styles.row}>
                    <Paragraph>Dark Mode</Paragraph>
                    <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} testID="darkModeToggle" />
                </View>
                <View style={styles.row}>
                    <Paragraph>Stream High Bitrate</Paragraph>
                    <Switch value={highBitrate} onValueChange={() => setHighBitrate(!highBitrate)} testID="highBitrateToggle" />
                </View>
            </View>
        );
    }

}

const stylesTemplate = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 16
    },
    header: {
        padding: 16
    }
});

const mapStateToProps = state => {
    return {
        darkMode: state.settings.darkMode,
        highBitrate: state.settings.highBitrate,
        styles: {
            ...stylesTemplate,
            view: {
                backgroundColor: state.theme.colors.background
            }
        }
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setDarkMode: mode => dispatch(setDarkMode(mode)),
        setHighBitrate: mode => dispatch(setHighBitrate(mode))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);