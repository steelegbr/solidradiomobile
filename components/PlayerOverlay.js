import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions, Image } from 'react-native'
import { Caption, Button, Text } from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import PlayerCarousel from './PlayerCarousel';
import AdComponent from './AdComponent';

class PlayerOverlay extends Component {

    bottomSheetRef = React.createRef();

    renderContent = () => {

        const { styles } = this.props;

        return(
            <View style={styles.contentContainer}>
                <PlayerCarousel style={styles.carousel} />
                <AdComponent style={styles.admob} />
            </View>
        );
        
    }

    onHeaderPress = () => {
        const currentRef = this.bottomSheetRef.current;
        if (currentRef != null) {
            currentRef.snapTo(1);
        }
    }

    renderHeader = () => {

        const { styles, theme, fall, header } = this.props;

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
                            source={{ uri: header.artUrl }}
                            style={styles.headerImage}
                        />
                    </TouchableWithoutFeedback>
                    <View style={styles.headerText}>
                        <Text theme={theme}>{header.title}</Text>
                        <Caption theme={theme}>
                            {header.subtitle}
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

        const { snapPoints, fall, showOnscreen } = this.props;

        if (showOnscreen) {

            return(
                    <BottomSheet
                        ref={this.bottomSheetRef}
                        snapPoints={snapPoints}
                        renderContent={this.renderContent}
                        renderHeader={this.renderHeader}
                        callbackNode={fall}
                    />
            );

        } else {
            return null;
        }
    }

}

const mapStateToProps = state => {

    // Work out if and what we should be displaying onscreen

    const showOnscreen = state.player.playlist.length > 0;
    let header = { title: '', subtitle: '', artUrl: '' }
    const currentItem = state.player.playlist[state.player.currentItem];

    if (currentItem !== undefined && currentItem.type == 'station') {
        const station = state.stations[currentItem.name]
        header.title = `${station.name} - ${station.onAir.show}`;
        header.subtitle = `${station.nowPlaying.artist} - ${station.nowPlaying.title}`;
        if (station.nowPlaying.artUrl) {
            header.artUrl = station.nowPlaying.artUrl;
        } else {
            header.artUrl = station.onAir.image;
        }
    }

    // Calculate dynamic sizing

    const headerHeight = 70;
    let imageSize = 0;

    if (state.vertical) {
        imageSize = Dimensions.get('window').width * 0.8;
    } else {
        imageSize = Dimensions.get('window').width * 0.6;
    }

    return {
        showOnscreen: showOnscreen,
        header: header,
        theme: state.theme,
        snapPoints: [headerHeight, Dimensions.get("window").height - headerHeight - 95],
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
            headerButton: {
                alignSelf: 'center',
                alignItems: 'flex-end',
                flexDirection: 'row'
            },
            contentContainer: {
                height: Dimensions.get("window").height - headerHeight - 212,
                backgroundColor: state.theme.colors.surface,
                flexDirection: 'column',
                justifyContent: 'space-between'
            },
            contentImageWrapper: {
                alignItems: 'center',
                padding: 10
            },
            contentImage: {
                width: imageSize,
                height: imageSize,
            },
            admob: {
                flex: 0
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