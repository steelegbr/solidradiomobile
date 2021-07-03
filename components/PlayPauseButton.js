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

import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PlayerState } from '../audio/player';
import { togglePlayPause } from '../reducers/actions';

class PlayPauseButton extends Component {

    render() {

        const { icon, style, bigMode, iconSize, showSpinner, togglePlayPause } = this.props;

        if (showSpinner) {

            // Loading spinner

            var size = bigMode ? iconSize : 16;
            return (
                <ActivityIndicator size={size} />
            );

        } else {

            // Normal button with play/pause options

            if (bigMode) {
                return (
                    <Icon.Button name={icon} size={iconSize} color={style.color} backgroundColor={style.backgroundColor} onPress={togglePlayPause} />
                );
            } else {
                return (
                    <Icon.Button name={icon} size={16} style={style} color={style.color} backgroundColor={style.backgroundColor} onPress={togglePlayPause} />
                );
            }

        }

    }

}

function mapStateToProps(state, ownProps) {

    // Size overrides

    const bigMode = 'bigMode' in ownProps ? ownProps.bigMode : false;
    const iconSize = 'iconSize' in ownProps ? ownProps.iconSize : 0;

    // Set the icon based on the state we're in

    let icon;
    let showSpinner = false;

    switch (state.player.state) {
        case PlayerState.UNINITIALISED:
        case PlayerState.IDLE:
        case PlayerState.ERROR:
        case PlayerState.PAUSED:
            icon = "play-circle";
            break;
        case PlayerState.LOADING:
            showSpinner = true;
            break;
        case PlayerState.PLAYING:
            icon = "pause-circle";
            break;
    }

    return {
        icon: icon,
        style: {
            color: state.theme.colors.primary,
            backgroundColor: 'rgba(0, 0, 0, 0.0)',
            padding: 10,
            margin: 5
        },
        bigMode: bigMode,
        iconSize: iconSize,
        showSpinner: showSpinner
    };

}

const mapDispatchToProps = dispatch => {
    return {
        togglePlayPause: () => dispatch(togglePlayPause('play_pause_button'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayPauseButton);