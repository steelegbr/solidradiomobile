import React, { Component } from 'react';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

class CastButton extends Component {

    render() {

        const { icon, style, bigMode, iconSize } = this.props;

        if (bigMode) {
            return(
                <Icon.Button style={style} name={icon} color={style.color} backgroundColor={style.backgroundColor} size={iconSize} />
            );
        } else {
            return(
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