/**
    Solid Radio Mobile App
    Copyright (C) 2020-2021 Marc Steele

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import React from 'react';
import TrackPlayer from 'react-native-track-player';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native'
import Scrubber from 'react-native-scrubber';
import PlayPauseButton from './PlayPauseButton';
import SkipButton, { DIRECTION_FORWARDS, DIRECTION_BACKWARDS } from './SkipButton';

/**
 * Controls for managing the player in the full overlay view.
 */

class PlayerOverlayControls extends TrackPlayer.ProgressComponent {

    render() {

        const { theme, largeIconSize } = this.props;

        return (
            <View>
                <View style={styles.scrubber}>
                    <Scrubber
                        value={this.state.position}
                        totalDuration={this.state.bufferedPosition}
                        trackColor={theme.colors.primary}
                        scrubbedColor={theme.colors.accent}
                        onSlidingComplete={() => { }}
                    />
                </View>
                <View style={styles.buttons}>
                    <SkipButton direction={DIRECTION_BACKWARDS} />
                    <PlayPauseButton bigMode={true} iconSize={largeIconSize} />
                    <SkipButton direction={DIRECTION_FORWARDS} />
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