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

        return(
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