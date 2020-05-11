import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { List } from "react-native-paper";
import { generateStationTheme } from "../branding/branding";

/**
 * List item for displaying the currently on air show.
 */

class NowPlayingListItem extends Component {

    render() {

        // Read in the properties

        const { nowPlaying, fallbackArtUrl } = this.props;
        var artUrl = nowPlaying.artUrl;
        if (!artUrl) {
            artUrl = fallbackArtUrl;
        }

        // Render the card

        return(
            <List.Item
                title="Now Playing"
                description={`${nowPlaying.artist} - ${nowPlaying.title}`}
                left={props => <List.Icon icon={{ uri: artUrl }} />}
            />
        );

    }

}

function mapStateToProps(state, ownProps) {

    return {
        nowPlaying: ownProps.station.nowPlaying,
        fallbackArtUrl: ownProps.station.logo_square
    };

}

export default connect(mapStateToProps)(NowPlayingListItem);