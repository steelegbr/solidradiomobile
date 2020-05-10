import React, { Component } from 'react';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

class CastButton extends Component {

    render() {

        const { icon, theme, bigMode, iconSize } = this.props;

        if (bigMode) {
            return(
                <Icon.Button name={icon} size={iconSize} />
            );
        } else {
            return(
                <Icon.Button name={icon} size={16} />
            );
        }

    }

}

function mapStateToProps(state, ownProps) {

    const bigMode = 'bigMode' in ownProps ? ownProps.bigMode : false;
    const iconSize = 'iconSize' in ownProps ? ownProps.iconSize : 0;

    return {
        icon: "cast",
        theme: state.theme,
        bigMode: bigMode,
        iconSize: iconSize
    };

}

export default connect(mapStateToProps)(CastButton);