import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Card, Paragraph, Title, Headline } from "react-native-paper";
import { generateStationTheme } from "../branding/branding";

/**
 * Card for displaying the currently on air show.
 */

class OnAirCard extends Component {

    render() {

        // Read in the properties

        const { onAir, theme } = this.props;

        // Render the card

        return(
            <Card theme={theme}>
                <Card.Cover source={{ uri: onAir.image }} />
                <Card.Content>
                    <Title>Now On Air - {onAir.show}</Title>
                    <Paragraph>{onAir.description}</Paragraph>
                </Card.Content>
            </Card>
        );

    }

}

function mapStateToProps(state, ownProps) {

    return {
        onAir: ownProps.onAir,
        theme: generateStationTheme(state.settings.darkMode, ownProps.station)
    };

}

export default connect(mapStateToProps)(OnAirCard);