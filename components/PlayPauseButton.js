import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PlayerState } from '../audio/player';
import { togglePlayPause } from '../reducers/actions';

class PlayPauseButton extends Component {

    render() {

        const { icon, fgColour, bgColour, bigMode, iconSize, showSpinner, togglePlayPause } = this.props;

        if (showSpinner) {

            // Loading spinner

            var size = bigMode ? iconSize : 16;
            return(
                <ActivityIndicator size={size} />
            );

        } else {

            // Normal button with play/pause options

            if (bigMode) {
                return(
                    <Icon name={icon} size={iconSize} color={fgColour} backgroundColor={bgColour} onPress={togglePlayPause} />
                );
            } else {
                return(
                    <Icon name={icon} size={16} color={fgColour} backgroundColor={bgColour} onPress={togglePlayPause} />
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
        fgColour: state.theme.colors.primary,
        bgColour: state.theme.colors.background,
        bigMode: bigMode,
        iconSize: iconSize,
        showSpinner: showSpinner
    };

}

const mapDispatchToProps = dispatch => {
    return {
        togglePlayPause: () => dispatch(togglePlayPause())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayPauseButton);