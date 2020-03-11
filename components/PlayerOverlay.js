import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions, Image } from 'react-native'
import { Title, Caption, Surface } from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

class PlayerOverlay extends Component {

    renderArt = () => {

        const { artUrl, styles, fall } = this.props;

        // Calculate our song art size and positions

        const artSizes = [50, Dimensions.get("window").width - 200]

        const artTopPositions = [
            -40, 
            Dimensions.get("window").width / 2 - artSizes[1] / 2
        ];

        const artLeftPositions = [
            20,
            Dimensions.get("window").width / 2 - artSizes[1] / 2
        ];

        // Animation

        const artLeftPositionAnimation = Animated.interpolate(fall, {
            inputRange: [0, 1],
            outputRange: artLeftPositions.slice().reverse(),
            extrapolate: Animated.Extrapolate.CLAMP
        });

        const artSizeAnimation = Animated.interpolate(fall, {
            inputRange: [0, 1],
            outputRange: artSizes.slice().reverse(),
            extrapolate: Animated.Extrapolate.CLAMP
        });

        const artTopPositionAnimation = Animated.interpolate(fall, {
            inputRange: [0, 1],
            outputRange: artTopPositions.slice().reverse(),
            extrapolate: Animated.Extrapolate.CLAMP
        });

        // Draw it

        return (
            <Animated.View
                key={'art-container'}
                style={[
                    {
                        height: artSizeAnimation,
                        width: artSizeAnimation,
                        left: artLeftPositionAnimation,
                        top: artTopPositionAnimation
                    }
                ]}
            >
                <Image 
                    key={'art-image'}
                    source={{ uri: artUrl }}
                    style={styles.artImage}
                />
            </Animated.View>
        );

    }

    renderContent = () => {

        return(
            <View>
                <Caption>More stuff variety...</Caption>
            </View>
        );
    }

    renderHeader = () => {

        return([
            <View key={'header'}>
                <Title>Hello!</Title>
            </View>,
            this.renderArt()
        ]);
    }

    render() {

        const { vertical, fall } = this.props;
        const snapPoints = [70, Dimensions.get("window").height - 150];

        return(
                <BottomSheet
                    snapPoints={snapPoints}
                    renderContent={this.renderContent}
                    renderHeader={this.renderHeader}
                    callbackNode={fall}
                />
        );
    }

}

const mapStateToProps = state => {
    return {
        theme: state.theme,
        vertical: state.vertical,
        artUrl: "https://dev.radiomusicstats.co.uk/media/songs/images/1443_f07a5a1e86624b3cb8ec76543b9863d7.png",
        styles: {
            artImage: {
                width: "100%",
                height: "100%"
            }
        },
        fall: new Animated.Value(1)
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerOverlay);