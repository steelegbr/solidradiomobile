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
import { Card, Paragraph, Title } from "react-native-paper";
import { generateStationTheme } from "../branding/branding";

/**
 * Card for displaying now playing information.
 */

class NowPlayingCard extends Component {

    render() {

        // Read in the properties

        const { nowPlaying, theme, fallbackArtUrl } = this.props;
        var artUrl = nowPlaying.artUrl;
        if (!artUrl) {
            artUrl = fallbackArtUrl;
        }

        // Render the card

        return (
            <Card theme={theme}>
                <Card.Cover source={{ uri: artUrl }} />
                <Card.Content>
                    <Title>Now Playing</Title>
                    <Paragraph>{nowPlaying.artist} - {nowPlaying.title}</Paragraph>
                </Card.Content>
            </Card>
        );

    }

}

function mapStateToProps(state, ownProps) {

    return {
        nowPlaying: ownProps.nowPlaying,
        theme: generateStationTheme(state.settings.darkMode, ownProps.station),
        fallbackArtUrl: ownProps.station.logo_square
    };

}

export default connect(mapStateToProps)(NowPlayingCard);