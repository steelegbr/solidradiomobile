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
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const DIRECTION_FORWARDS = 0;
export const DIRECTION_BACKWARDS = 1;

class SkipButton extends Component {

    render() {

        const { icon, style, bigMode, iconSize, canSkip } = this.props;

        if (bigMode) {
            return (
                <Icon.Button color={style.color} backgroundColor={style.backgroundColor} disabled={!canSkip} name={icon} size={iconSize} />
            );
        } else {
            return (
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

    switch (direction) {
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