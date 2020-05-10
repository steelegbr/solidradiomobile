import React, { Component } from 'react';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const DIRECTION_FORWARDS = 0;
export const DIRECTION_BACKWARDS = 1;

class SkipButton extends Component {

    render() {

        const { icon, theme, bigMode, iconSize, canSkip } = this.props;

        if (bigMode) {
            return(
                <Button theme={theme} disabled={!canSkip}>
                    <Icon name={icon} size={iconSize} />
                </Button>
            );
        } else {
            return(
                <Button theme={theme} disabled={!canSkip}>
                    <Icon name={icon} size={16} />
                </Button>
            );
        }

    }

}

/**
 * Indicates if we can skip in the requested direction.
 * @param {int} direction The direction we want to skip.
 * @param {int} playlistLength The length of the playlist.
 * @param {int} currentItem The item number we're on in the playlist.
 */

function canSkip(direction, playlistLength, currentItem) {

    switch(direction) {
        case DIRECTION_FORWARDS:
            return currentItem < (playlistLength - 1);
        case DIRECTION_BACKWARDS:
            return currentItem > 0;
        default:
            false;
    }

}

function mapStateToProps(state, ownProps) {

    const bigMode = 'bigMode' in ownProps ? ownProps.bigMode : false;
    const iconSize = 'iconSize' in ownProps ? ownProps.iconSize : 0;
    const icon = ownProps.direction == DIRECTION_FORWARDS ? "skip-next" : "skip-previous"

    return {
        icon: icon,
        theme: state.theme,
        bigMode: bigMode,
        iconSize: iconSize,
        canSkip: canSkip(ownProps.direction, state.player.playlist.length, state.player.currentItem)
    };

}

export default connect(mapStateToProps)(SkipButton);