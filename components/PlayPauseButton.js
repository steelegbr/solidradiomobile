import React, { Component } from 'react';
import { Button, ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PlayerState } from '../audio/player';

class PlayPauseButton extends Component {

    render() {

        const { icon, theme, bigMode, iconSize, showSpinner } = this.props;

        if (showSpinner) {

            // Loading spinner

            var size = bigMode ? iconSize : 16;
            return(
                <Button theme={theme}>
                    <ActivityIndicator size={size} />
                </Button>
            );

        } else {

            // Normal button with play/pause options

            if (bigMode) {
                return(
                    <Button theme={theme}>
                        <Icon name={icon} size={iconSize} />
                    </Button>
                );
            } else {
                return(
                    <Button theme={theme}>
                        <Icon name={icon} size={16} />
                    </Button>
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
        theme: state.theme,
        bigMode: bigMode,
        iconSize: iconSize,
        showSpinner: showSpinner
    };

}

export default connect(mapStateToProps)(PlayPauseButton);