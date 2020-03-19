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

    renderContent = () => {

        const { styles } = this.props;

        return([
            <Animated.View
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

        const { styles, theme, fall, artUrl } = this.props;

        const animatedHeaderContentOpacity = Animated.interpolate(fall, {
            inputRange: [0.75, 1],
            outputRange: [0, 1],
            extrapolate: Animated.Extrapolate.CLAMP,
        });

        return(
            <View style={styles.headerContainer}>
                <Animated.View
                    style={[
                        styles.headerSubContainer,
                        {
                            opacity: animatedHeaderContentOpacity
                        }
                    ]}
                >
                    <TouchableWithoutFeedback
                        style={styles.headerImageWrapper}
                        onPress={this.onHeaderPress}
                    >
                        <Image
                            source={{ uri: artUrl }}
                            style={styles.headerImage}
                        />
                    </TouchableWithoutFeedback>
                    <View style={styles.headerText}>
                        <Text theme={theme}>Solid Radio</Text>
                        <Caption theme={theme}>
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
            </View>
        );
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
            headerImage: {
                width: 55,
                height: 55
            },
            headerImageWrapper: {
                alignSelf: 'center',
                flex: 0,
                padding: 10
            },
            headerContainer: {
                height: 70,
                backgroundColor: state.theme.colors.surface
            },
            headerSubContainer: {
                flexDirection: 'row',
                alignItems: 'stretch'
            },
            headerText: {
                flexDirection: 'column',
                alignItems: 'stretch',
                flex: 1,
                padding: 10
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