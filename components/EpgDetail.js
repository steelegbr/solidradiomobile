/**
 * Detailed EPG listing view.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { Card, Text, Title, Subheading, Button } from 'react-native-paper';
import { showTimeSlug } from '../epg/timezone';


class EpgDetail extends Component {

    render() {

        const { listing, stationTimezone, userTimezone, day, styles, navigation } = this.props;

        let timeSlug = null;

        if (__DEV__) {
            // Fixed time for testing against (so DST doesn't fail tests)
            timeSlug = showTimeSlug(listing, day, userTimezone, stationTimezone, true, new Date(1601456400000));
        } else {
            timeSlug = showTimeSlug(listing, day, userTimezone, stationTimezone, true);
        }

        return  (
            <ScrollView
                contentContainerStyle={styles.wrapper}
            >
                <Card
                    style={styles.card}
                >
                    <Card.Cover source={{ uri: listing.image }} />
                    <Card.Content>
                        <Title>{ listing.title }</Title>
                        <Subheading>{ timeSlug }</Subheading>
                        <Text>{ listing.description }</Text>
                    </Card.Content>
                </Card>
                <Button
                    mode="contained"
                    icon="arrow-left"
                    style={styles.button}
                    onPress={() => {
                        navigation.pop();
                    }}
                >
                    Back
                </Button>
            </ScrollView>
        );

    }

}

const mapStateToProps = (state, ownProps) => {

    const currentStation = state.currentStation;
    const uiWidth = Dimensions.get('window').width * 0.9;

    return {
        listing: ownProps.route.params.listing,
        stationTimezone: state.stations[currentStation].timezone,
        userTimezone: state.timezone,
        day: ownProps.route.params.day,
        styles: {
            card: {
                width: uiWidth,
            },
            wrapper: {
                alignItems: 'center'
            },
            button: {
                marginTop: 10,
                marginBottom: 20,
                width: uiWidth
            }
        },
        navigation: ownProps.navigation
    };

}

export default connect(mapStateToProps)(EpgDetail);