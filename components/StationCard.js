import React from 'react';
import { Component } from 'react';
import { View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Button, Title, Caption, Surface } from 'react-native-paper';
import { connect } from 'react-redux';

class StationCard extends Component {

    render() {

        // Read in the properties and adjust the style

        const { station, nowPlaying, theme, borderRadius } = this.props;

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
            showImageWrapper: {
            },
            showImage: {
                width: "100%",
                height: Dimensions.get('window').height * 0.45,
                resizeMode: "cover"
            },
            wrapper: {
                borderRadius: borderRadius,
                borderRadius: borderRadius,
                flexDirection: "column",
                justifyContent: "flex-end"
            },
            intermediateText: {
                backgroundColor: theme.background,
                padding: 10
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
            }
        }

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
                    <View style={styles.showImageWrapper}>
                        <Image
                            source={{ uri: "https://www.solidradio.co.uk/wp-content/uploads/2019/08/IMG_4553.jpg" }}
                            style={styles.showImage}
                        />
                    </View>
                    <View style={styles.intermediateText}>
                        <Title>On Air</Title>
                        <Caption>Breakfast Without the Waffle</Caption>
                    </View>
                    <View style={styles.intermediateText}>
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
        borderRadius: state.theme.roundness
    };

}

const mapDispatchToProps = {

};

export default connect(mapStateToProps)(StationCard);