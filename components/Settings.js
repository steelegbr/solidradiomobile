import React from 'react';
import { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Switch, Paragraph } from 'react-native-paper';
import { connect } from 'react-redux';
import { setDarkMode, setHighBitrate } from '../reducers/actions';

class Settings extends Component {

    render() {

        const { darkMode, highBitrate, styles, setDarkMode, setHighBitrate } = this.props;

        return(
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