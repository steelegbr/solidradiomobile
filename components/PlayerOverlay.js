import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions, Image } from 'react-native'
import { Title, Caption, Button, Text } from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

class PlayerOverlay extends Component {

    bottomSheetRef = React.createRef();

    renderArt = () => {

        const { artUrl, styles, fall } = this.props;

        // Calculate our song art size and positions

        const artSizes = [50, Dimensions.get("window").width - 200]

        const artTopPositions = [
            20, 
            200
        ];

        const artLeftPositions = [
            10,
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

        const { styles } = this.props;

        return([
            <Animated.View
                key={'content-container'}
                style={styles.contentContainer}
            >
            </Animated.View>
        ]);
        
    }

    onHeaderPress = () => {
        const currentRef = this.bottomSheetRef.current;
        if (currentRef != null) {
            currentRef.snapTo(1);
        }
    }

    renderHeader = () => {

        const { styles, theme, fall } = this.props;

        const animatedHeaderContentOpacity = Animated.interpolate(fall, {
            inputRange: [0.75, 1],
            outputRange: [0, 1],
            extrapolate: Animated.Extrapolate.CLAMP,
        });

        return([
            <TouchableWithoutFeedback
                key={'header-container'}
                onPress={this.onHeaderPress}
            >
                <Animated.View>
                    <Animated.View
                        style={[
                            styles.headerContainer,
                            {
                                opacity: animatedHeaderContentOpacity
                            },
                        ]}
                    >
                        <View style={styles.headerText}>
                            <Text theme={theme}>Solid Radio</Text>
                            <Caption 
                                theme={theme}
                                style={styles.artistTitle}
                            >
                                Song Artist - Song Title That's Way Too Long
                            </Caption>
                        </View>
                        <View style={styles.headerButton}>
                            <Button
                                icon="cast"
                                theme={theme}
                                
                            />
                            <Button
                                icon="play"
                                theme={theme}
                            />
                        </View>
                    </Animated.View>
                </Animated.View>
            </TouchableWithoutFeedback>/*,
            this.renderArt()*/
        ]);
    }

    render() {

        const { vertical, fall } = this.props;
        const snapPoints = [70, Dimensions.get("window").height - 100];

        return(
                <BottomSheet
                    ref={this.bottomSheetRef}
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
            },
            headerContainer: {
                height: 120,
                backgroundColor: state.theme.colors.surface,
                flexDirection: 'row',
                alignItems: 'stretch'
            },
            headerText: {
                left: 80,
                padding: 20,
                width: Dimensions.get("window").width - 130,
                flexDirection: 'column',
                alignItems: 'stretch'
                
            },
            artistTitle: {
                backgroundColor: "#ff0000",
                flexWrap: 'wrap',
                flex: 2
            },
            headerButton: {
                alignSelf: 'center',
                alignItems: 'flex-end',
                flexDirection: 'row'
            },
            contentContainer: {
                height: Dimensions.get("window").height - 100,
                backgroundColor: state.theme.colors.surface,
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