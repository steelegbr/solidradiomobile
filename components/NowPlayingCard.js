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

        return(
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