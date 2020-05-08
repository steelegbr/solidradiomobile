import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions, Image } from 'react-native'
import { Caption, Button, Text } from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import PlayerCarousel from './PlayerCarousel';
import AdComponent from './AdComponent';
import OverlayHeader from './OverlayHeader';
import PlayerOverlayControls from './PlayerOverlayControls';

class PlayerOverlay extends Component {

    bottomSheetRef = React.createRef();

    renderContent = () => {

        const { styles } = this.props;

        return(
            <View style={styles.contentContainer}>
                <PlayerCarousel style={styles.carousel} />
                <PlayerOverlayControls />
                <AdComponent style={styles.admob} unitId="playerOverlay" />
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

        const { fall } = this.props;

        return(
            <OverlayHeader fall={fall} onHeaderPress={this.onHeaderPress} />
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

    // Work out if we should be displaying onscreen

    const showOnscreen = state.player.playlist.length > 0;

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
        theme: state.theme,
        snapPoints: [headerHeight, Dimensions.get("window").height - headerHeight - 95],
        styles: {
            contentContainer: {
                height: Dimensions.get("window").height - headerHeight - 165,
                paddingTop: 10,
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