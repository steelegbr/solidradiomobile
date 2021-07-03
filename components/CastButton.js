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
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

class CastButton extends Component {

    render() {

        const { icon, style, bigMode, iconSize } = this.props;

        if (bigMode) {
            return (
                <Icon.Button style={style} name={icon} color={style.color} backgroundColor={style.backgroundColor} size={iconSize} />
            );
        } else {
            return (
                <Icon.Button style={style} name={icon} color={style.color} backgroundColor={style.backgroundColor} size={16} />
            );
        }

    }

}

function mapStateToProps(state, ownProps) {

    const bigMode = 'bigMode' in ownProps ? ownProps.bigMode : false;
    const iconSize = 'iconSize' in ownProps ? ownProps.iconSize : 0;

    return {
        icon: "cast",
        style: {
            color: state.theme.colors.primary,
            backgroundColor: 'rgba(0, 0, 0, 0.0)',
            padding: 10,
            margin: 5
        },
        bigMode: bigMode,
        iconSize: iconSize
    };

}

export default connect(mapStateToProps)(CastButton);