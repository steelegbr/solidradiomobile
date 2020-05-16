import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const DIRECTION_FORWARDS = 0;
export const DIRECTION_BACKWARDS = 1;

class SkipButton extends Component {

    render() {

        const { icon, style, bigMode, iconSize, canSkip } = this.props;

        if (bigMode) {
            return(
                <Icon.Button color={style.color} backgroundColor={style.backgroundColor} disabled={!canSkip} name={icon} size={iconSize} />
            );
        } else {
            return(
                <Icon.Button color={style.color} backgroundColor={style.backgroundColor} name={icon} size={16} disabled={!canSkip} />
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
            return false;
    }

}

function mapStateToProps(state, ownProps) {

    const bigMode = 'bigMode' in ownProps ? ownProps.bigMode : false;
    const iconSize = 'iconSize' in ownProps ? ownProps.iconSize : 0;
    const icon = ownProps.direction == DIRECTION_FORWARDS ? "skip-next" : "skip-previous"

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
        canSkip: canSkip(ownProps.direction, state.player.playlist.length, state.player.currentItem)
    };

}

export default connect(mapStateToProps)(SkipButton);