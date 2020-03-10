import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions } from 'react-native'
import { Title, Caption, Surface } from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';

class PlayerOverlay extends Component {

    renderContent = () => {

        const { theme } = this.props;

        return(
            <Surface theme={theme}>
                <Caption>Some stuff goes here...</Caption>
            </Surface>
        );
    }

    renderHeader = () => {

        const { theme } = this.props;

        return(
            <Surface theme={theme}>
                <Title>Hello!</Title>
            </Surface>
        );
    }

    render() {

        const { vertical } = this.props;
        const snapPoints = [70, Dimensions.get("screen").height - 150];

        console.log(`Vertical: ${vertical}`);

        return(
                <BottomSheet
                    snapPoints={snapPoints}
                    renderContent={this.renderContent}
                    renderHeader={this.renderHeader}
                />
        );
    }

}

const mapStateToProps = state => {
    return {
        theme: state.theme,
        vertical: state.vertical
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerOverlay);