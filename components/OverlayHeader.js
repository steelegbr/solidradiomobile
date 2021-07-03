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

import React, { Component } from 'react';
import Animated from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { View, Image } from 'react-native'
import { Caption, Button, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import CastButton from './CastButton';
import PlayPauseButton from './PlayPauseButton';

/**
 * Component for displaying the header / footer in the swipe up overlay.
 */

class OverlayHeader extends Component {

    render() {

        const { theme, fall, header, onHeaderPress, styles } = this.props;

        const animatedHeaderContentOpacity = Animated.interpolate(fall, {
            inputRange: [0.75, 1],
            outputRange: [0, 1],
            extrapolate: Animated.Extrapolate.CLAMP,
        });

        return (
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
                        onPress={onHeaderPress}
                    >
                        <Image
                            source={{ uri: header.artUrl }}
                            style={styles.headerImage}
                        />
                    </TouchableWithoutFeedback>
                    <View style={styles.headerText}>
                        <Text theme={theme} numberOfLines={1}>{header.title}</Text>
                        <Caption theme={theme} numberOfLines={1}>
                            {header.subtitle}
                        </Caption>
                    </View>
                    <View style={styles.headerButton}>
                        <PlayPauseButton />
                    </View>
                </Animated.View>
            </View>
        );

    }

}

function mapStateToProps(state, ownProps) {

    // Work out the current item

    const currentItem = state.player.playlist[state.player.currentItem];
    let header = {};

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

    // Send the calculated props back

    return {
        header: header,
        fall: ownProps.fall,
        theme: state.theme,
        onHeaderPress: ownProps.onHeaderPress,
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
                alignItems: 'center',
                flexDirection: 'row',
                padding: 10
            }
        }
    };

}

export default connect(mapStateToProps)(OverlayHeader);