import React from 'react';
import { Component } from 'react';
import { View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Button, Title, Caption, Surface } from 'react-native-paper';
import { connect } from 'react-redux';

class StationCard extends Component {

    render() {

        // Read in the properties and adjust the style

        const { station, nowPlaying, theme, borderRadius, vertical, tablet } = this.props;

        const albumArtSize = Dimensions.get('window').height * 0.45;

        const styles = {
            logoWrapper: {
                backgroundColor: station.primaryColour,
                borderTopLeftRadius: borderRadius,
                borderTopRightRadius: borderRadius
            },
            logo : {
                backgroundColor: station.primaryColour,
                height: 50,
                borderTopLeftRadius: borderRadius,
                borderTopRightRadius: borderRadius,
                resizeMode: "contain"
            },
            showImageVertical: {
                width: "100%",
                height: Dimensions.get('window').height * 0.45,
                resizeMode: "cover"
            },
            showImageHorizontal: {
                width: Dimensions.get('window').width * 0.5,
                height: Dimensions.get('window').height - 300,
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
                backgroundColor: theme.background,
                alignItems: "center",
                padding: 10
            },
            horizontalIntermediateText: {
                backgroundColor: theme.background,
                padding: 10,
                alignItems: "center",
                flex: 1
            },
            actions: {
                backgroundColor: theme.background,
                borderBottomLeftRadius: borderRadius,
                borderBottomRightRadius: borderRadius,
                padding: 20
            },
            button: {
                backgroundColor: station.primaryColour
            },
            surface: {
                borderRadius: borderRadius
            },
            albumArt: {
                width: albumArtSize,
                height: albumArtSize,
                resizeMode: "cover",
                alignSelf: "center"
            },
            albumArtWrapper: {
                backgroundColor: theme.background
            }
        }

        if (vertical) {

            return(
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
                                source={{ uri: "https://www.solidradio.co.uk/wp-content/uploads/2019/08/IMG_4553.jpg" }}
                                style={styles.showImageVertical}
                            />
                        </View>
                        <View style={styles.verticalIntermediateText}>
                            <Title>On Air</Title>
                            <Caption>Breakfast Without the Waffle</Caption>
                        </View>
                        <View style={styles.verticalIntermediateText}>
                            <Title>Now Playing</Title>
                            <Caption>{nowPlaying.artist} - {nowPlaying.title}</Caption>
                        </View>
                        <View style={styles.actions}>
                            <Button
                                icon="play"
                                mode="contained"
                                style={styles.button}
                            >
                                Listen Live
                            </Button>
                        </View>
                    </Surface>
                </TouchableOpacity>
            );

        } else {

            return(
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
                                    source={{ uri: "https://www.solidradio.co.uk/wp-content/uploads/2019/08/IMG_4553.jpg" }}
                                    style={styles.showImageHorizontal}
                                />
                            </View>
                            <View style={styles.horizontalTextWrapper}>
                                <View style={styles.horizontalIntermediateText}>
                                    <Title>On Air</Title>
                                    <Caption>Breakfast Without the Waffle</Caption>
                                </View>
                                <View style={styles.horizontalIntermediateText}>
                                    <Title>Now Playing</Title>
                                    <Caption>{nowPlaying.artist} - {nowPlaying.title}</Caption>
                                </View>
                                { tablet &&
                                    <View style={styles.albumArtWrapper}>
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
                                style={styles.button}
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
            primaryColour: station.primary_colour
        },
        nowPlaying: station.nowPlaying,
        theme: {
            background: state.theme.colors.background
        },
        borderRadius: state.theme.roundness,
        vertical: state.vertical,
        tablet: state.tablet
    };

}

const mapDispatchToProps = {

};

export default connect(mapStateToProps)(StationCard);