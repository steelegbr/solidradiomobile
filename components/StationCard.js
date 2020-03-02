import React from 'react';
import { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Button, Title, Caption, Surface } from 'react-native-paper';
import { connect } from 'react-redux';

class StationCard extends Component {

    render() {
        const { station, styles } = this.props;
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
                        <Caption>Eurythmics &amp; Aretha Franklin - Sisters Are Doin' It for Themselves</Caption>
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

const borderRadius = 20;
const borderWidth = 0.3;

function mapStateToProps(state, ownProps) {

    const station = state.stations[ownProps.stationName];
    console.log(station);
    console.log(state.theme);

    return {
        station: {
            name: station.name,
            logo: station.logo_inverse
        },
        styles: StyleSheet.create({
            logoWrapper: {
                backgroundColor: station.primary_colour,
                borderTopLeftRadius: borderRadius,
                borderTopRightRadius: borderRadius
            },
            logo : {
                backgroundColor: station.primary_colour,
                height: 50,
                borderTopLeftRadius: borderRadius,
                borderTopRightRadius: borderRadius,
                resizeMode: "contain"
            },
            showImageWrapper: {
            },
            showImage: {
                width: "100%",
                height: 300,
                resizeMode: "cover"
            },
            wrapper: {
                borderRadius: borderRadius,
                borderRadius: borderRadius,
                flexDirection: "column",
                justifyContent: "flex-end"
            },
            intermediateText: {
                backgroundColor: state.theme.colors.background,
                padding: 5
            },
            actions: {
                backgroundColor: state.theme.colors.background,
                borderBottomLeftRadius: borderRadius,
                borderBottomRightRadius: borderRadius,
                padding: 20
            },
            button: {
                backgroundColor: station.primary_colour
            },
            surface: {
                borderRadius: borderRadius
            }
        })
    };

}

const mapDispatchToProps = {

};

export default connect(mapStateToProps)(StationCard);