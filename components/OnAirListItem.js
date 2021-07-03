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

import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { List } from "react-native-paper";
import { generateStationTheme } from "../branding/branding";

/**
 * List item for displaying the currently on air show.
 */

class OnAirListItem extends Component {

    render() {

        // Read in the properties

        const { onAir } = this.props;

        // Render the card

        return (
            <List.Item
                title={`Now On Air - ${onAir.show}`}
                description={onAir.description}
                left={props => <List.Icon icon={{ uri: onAir.image }} />}
            />
        );

    }

}

function mapStateToProps(state, ownProps) {

    return {
        onAir: ownProps.station.onAir
    };

}

export default connect(mapStateToProps)(OnAirListItem);