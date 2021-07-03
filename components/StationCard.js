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
import { Component } from 'react';
import { View, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { Button, Title, Caption, Surface } from 'react-native-paper';
import { connect } from 'react-redux';
import { generateStationTheme } from '../branding/branding';
import { setCurrentStation, loadPlayerStation } from '../reducers/actions';

class StationCard extends Component {

    render() {

        // Read in the properties and adjust the style

        const { station, nowPlaying, theme, borderRadius, vertical, tablet, onAir, setCurrentStation, loadPlayerStation } = this.props;

        // Album art with fallback

        const albumArtSize = Dimensions.get('window').height * 0.35;

        // Set the now on air properties

        const onAirImage = onAir.image == null ? station.logo_square : onAir.image;
        const onAirShow = onAir.show == null ? 'Loading...' : onAir.show;

        // Work out our offsets

        const verticalImageOffset = Platform.OS === 'android' ? 450 : 600;

        // Dynamically adjust layout for screen size

        const styles = {
            logoWrapper: {
                backgroundColor: station.primaryColour,
                borderTopLeftRadius: borderRadius,
                borderTopRightRadius: borderRadius
            },
            logo: {
                height: 50,
                borderTopLeftRadius: borderRadius,
                borderTopRightRadius: borderRadius,
                resizeMode: "contain"
            },
            showImageVertical: {
                width: "100%",
                height: Dimensions.get('window').height - verticalImageOffset,
                resizeMode: "cover"
            },
            showImageHorizontal: {
                width: Dimensions.get('window').width * 0.5,
                height: Dimensions.get('window').height - 330,
                resizeMode: "cover"
            },
            wrapper: {
                borderRadius: borderRadius,
                borderRadius: borderRadius,
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: 5
            },
            horizontalWrapper: {
                flexDirection: "row"
            },
            horizontalTextWrapper: {
                flexDirection: "column",
                flex: 2
            },
            verticalIntermediateText: {
                alignItems: "center",
                padding: 10
            },
            horizontalIntermediateText: {
                padding: 10,
                alignItems: "center",
                flex: 1
            },
            actions: {
                borderBottomLeftRadius: borderRadius,
                borderBottomRightRadius: borderRadius,
                padding: 20,
                alignItems: "flex-start"
            },
            surface: {
                borderRadius: borderRadius,
                alignSelf: "stretch",
                marginTop: 20
            },
            albumArt: {
                width: albumArtSize,
                height: albumArtSize,
                resizeMode: "cover",
                alignSelf: "center"
            }
        }

        if (vertical) {

            return (
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.wrapper}
                >
                    <Surface
                        style={styles.surface}
                    >
                        <View style={styles.logoWrapper}>
                            <Image
                                source={{ uri: station.logo }}
                                style={styles.logo}
                            />
                        </View>
                        <View>
                            <Image
                                source={{ uri: onAirImage }}
                                style={styles.showImageVertical}
                            />
                        </View>
                        <View style={styles.verticalIntermediateText}>
                            <Title>On Air</Title>
                            <Caption>{onAirShow}</Caption>
                        </View>
                        <View style={styles.verticalIntermediateText}>
                            <Title>Now Playing</Title>
                            <Caption>{nowPlaying.artist} - {nowPlaying.title}</Caption>
                        </View>
                        <View style={styles.actions}>
                            <Button
                                icon="play"
                                mode="contained"
                                theme={theme}
                                dark={true}
                                onPress={() => {
                                    setCurrentStation(station.name);
                                    loadPlayerStation(station.name);
                                }}
                            >
                                Listen Live
                            </Button>
                        </View>
                    </Surface>
                </TouchableOpacity>
            );

        } else {

            return (
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.wrapper}
                >
                    <Surface
                        style={styles.surface}
                    >
                        <View style={styles.logoWrapper}>
                            <Image
                                source={{ uri: station.logo }}
                                style={styles.logo}
                            />
                        </View>
                        <View style={styles.horizontalWrapper}>
                            <View>
                                <Image
                                    source={{ uri: onAirImage }}
                                    style={styles.showImageHorizontal}
                                />
                            </View>
                            <View style={styles.horizontalTextWrapper}>
                                <View style={styles.horizontalIntermediateText}>
                                    <Title>On Air</Title>
                                    <Caption>{onAirShow}</Caption>
                                </View>
                                <View style={styles.horizontalIntermediateText}>
                                    <Title>Now Playing</Title>
                                    <Caption>{nowPlaying.artist} - {nowPlaying.title}</Caption>
                                </View>
                                {tablet && nowPlaying.artUrl != null &&
                                    <View>
                                        <Image
                                            source={{ uri: nowPlaying.artUrl }}
                                            style={styles.albumArt}
                                        />
                                    </View>
                                }
                            </View>
                        </View>
                        <View style={styles.actions}>
                            <Button
                                icon="play"
                                mode="contained"
                                theme={theme}
                                dark={true}
                                onPress={() => {
                                    setCurrentStation(station.name);
                                    loadPlayerStation(station.name);
                                }}
                            >
                                Listen Live
                            </Button>
                        </View>
                    </Surface>
                </TouchableOpacity>
            );

        }
    }

}

function mapStateToProps(state, ownProps) {

    const station = state.stations[ownProps.stationName];

    return {
        station: {
            name: station.name,
            logo: station.logo_inverse,
            primaryColour: station.primary_colour,
            textColour: station.text_colour,
            logo_square: station.logo_square
        },
        nowPlaying: station.nowPlaying,
        onAir: station.onAir,
        theme: generateStationTheme(state.settings.darkMode, station),
        borderRadius: state.theme.roundness,
        vertical: state.vertical,
        tablet: state.tablet
    };

}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentStation: stationName => dispatch(setCurrentStation(stationName)),
        loadPlayerStation: stationName => dispatch(loadPlayerStation(stationName))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StationCard);