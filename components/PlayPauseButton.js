import React, { Component } from 'react';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

class PlayPauseButton extends Component {

    render() {

        const { icon, theme, bigMode, iconSize } = this.props;

        if (bigMode) {
            return(
                <Button theme={theme}>
                    <Icon name={icon} size={iconSize} />
                </Button>
            );
        } else {
            return(
                <Button theme={theme}>
                    <Icon name={icon} size={16} />
                </Button>
            );
        }

    }

}

function mapStateToProps(state, ownProps) {

    const bigMode = 'bigMode' in ownProps ? ownProps.bigMode : false;
    const iconSize = 'iconSize' in ownProps ? ownProps.iconSize : 0;

    return {
        icon: "play-arrow",
        theme: state.theme,
        bigMode: bigMode,
        iconSize: iconSize
    };

}

export default connect(mapStateToProps)(PlayPauseButton);