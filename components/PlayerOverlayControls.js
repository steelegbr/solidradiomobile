import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native'
import Scrubber from 'react-native-scrubber';
import PlayPauseButton from './PlayPauseButton';
import CastButton from './CastButton';
import SkipButton, { DIRECTION_FORWARDS, DIRECTION_BACKWARDS } from './SkipButton';
import TrackPlayer from 'react-native-track-player';

/**
 * Controls for managing the player in the full overlay view.
 */

class PlayerOverlayControls extends TrackPlayer.ProgressComponent {

    render() {

        const { theme, largeIconSize } = this.props;

        return(
            <View>
                <View style={styles.scrubber}>
                    <Scrubber
                        value={this.state.position}
                        totalDuration={this.state.bufferedPosition}
                        trackColor={theme.colors.primary}
                        scrubbedColor={theme.colors.accent}
                    />
                </View>
                <View style={styles.buttons}>
                    <SkipButton direction={DIRECTION_BACKWARDS} />
                    <PlayPauseButton bigMode={true} iconSize={largeIconSize} />
                    <SkipButton direction={DIRECTION_FORWARDS} />
                </View>
                <View style={styles.buttons}>
                    <CastButton bigMode={true} iconSize={largeIconSize} />
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    scrubber: {
        padding: 10
    },
    buttons: {
        padding: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
});

function mapStateToProps(state) {
    return {
        theme: state.theme,
        largeIconSize: 24
    };
}

export default connect(mapStateToProps)(PlayerOverlayControls);