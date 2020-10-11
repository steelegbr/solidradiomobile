/**
 * EPG listings for a given day.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { FlatList } from 'react-native';
import { List } from 'react-native-paper';
import { epgTimeToFriendly, epgTimeToLocal } from '../epg/timezone';

class EpgList extends Component {

    render() {

        const { listings, stationTimezone, userTimezone, currentDay } = this.props;

        return (
            <FlatList
                data={listings}
                renderItem={({ item }) => {

                    // Work out if we're in different time zones

                    let timeSlug;
            
                    if (userTimezone == stationTimezone) {
            
                        // Show a friendly time slug
            
                        timeSlug = epgTimeToFriendly(item.start);
            
                    } else {

                        // Show both the friendly time slug and a conversion to local
            
                        timeSlug = `${epgTimeToFriendly(item.start)} [${epgTimeToLocal(item.start, currentDay, userTimezone, stationTimezone)}]`;
            
                    }
            
                    return(
                        <List.Item
                            title={item.title}
                            left={props => <List.Icon icon={{ uri: item.image }} />}
                            description={timeSlug}
                        />
                    )

                }}
                keyExtractor={(item, index) => index.toString()}
            />
        );

    }

}

const mapStateToProps = (state) => {

    // Locate the station and date in the EPG

    const currentDay = state.epg.currentDay;
    const currentStation = state.epg.currentStation;

    return {
        listings: state.stations[currentStation].epg[currentDay],
        stationTimezone: state.stations[currentStation].timezone,
        userTimezone: state.timezone,
        currentDay: currentDay
    };

}

export default connect(mapStateToProps)(EpgList);