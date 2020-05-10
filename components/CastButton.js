import React, { Component } from 'react';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

class CastButton extends Component {

    render() {

        const { icon, fgColour, bgColour, bigMode, iconSize } = this.props;

        if (bigMode) {
            return(
                <Icon.Button color={fgColour} backgroundColor={bgColour} name={icon} size={iconSize} />
            );
        } else {
            return(
                <Icon.Button color={fgColour} backgroundColor={bgColour} name={icon} size={16} />
            );
        }

    }

}

function mapStateToProps(state, ownProps) {

    const bigMode = 'bigMode' in ownProps ? ownProps.bigMode : false;
    const iconSize = 'iconSize' in ownProps ? ownProps.iconSize : 0;

    return {
        icon: "cast",
        fgColour: state.theme.colors.primary,
        bgColour: state.theme.colors.background,
        bigMode: bigMode,
        iconSize: iconSize
    };

}

export default connect(mapStateToProps)(CastButton);