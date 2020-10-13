/**
 * Detailed EPG listing view.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { Card, Text, Title, Subheading } from 'react-native-paper';
import { showTimeSlug } from '../epg/timezone';


class EpgDetail extends Component {

    render() {

        const { listing, stationTimezone, userTimezone, day, styles } = this.props;

        const timeSlug = showTimeSlug(listing, day, userTimezone, stationTimezone, true);

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
            </ScrollView>
        );

    }

}

const mapStateToProps = (state, ownProps) => {

    const currentStation = state.currentStation;

    return {
        listing: ownProps.route.params.listing,
        stationTimezone: state.stations[currentStation].timezone,
        userTimezone: state.timezone,
        day: ownProps.route.params.day,
        styles: {
            card: {
                width: Dimensions.get('window').width * 0.9,
            },
            wrapper: {
                alignItems: 'center'
            }
        }
    };

}

export default connect(mapStateToProps)(EpgDetail);