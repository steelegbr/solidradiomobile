import React from 'react';
import { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Switch, Paragraph } from 'react-native-paper';
import { connect } from 'react-redux';
import { setDarkMode } from '../reducers/actions';

class Settings extends Component {

    render() {

        const { darkMode, highBitrate, styles, setDarkMode } = this.props;

        return(
            <View >
                <Title style={styles.header}>Settings</Title>
                <View style={styles.row}>
                    <Paragraph>Dark Mode</Paragraph>
                    <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />
                </View>
                <View style={styles.row}>
                    <Paragraph>Stream High Bitrate</Paragraph>
                    <Switch value={highBitrate} />
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
        setDarkMode: mode => dispatch(setDarkMode(mode))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);