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

/**
 * EPG listings for a given day.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { FlatList } from 'react-native';
import { List } from 'react-native-paper';
import { showTimeSlug } from '../epg/timezone';

class EpgList extends Component {

    render() {

        const { listings, stationTimezone, userTimezone, currentDay, navigation } = this.props;

        return (
            <FlatList
                data={listings}
                renderItem={({ item }) => {

                    const timeSlug = showTimeSlug(item, currentDay, userTimezone, stationTimezone, false);

                    return (
                        <List.Item
                            title={item.title}
                            left={props => <List.Icon icon={{ uri: item.image }} />}
                            description={timeSlug}
                            onPress={() => {
                                navigation.push('EpgDetail', {
                                    listing: item,
                                    day: currentDay
                                });
                            }}
                        />
                    )

                }}
                keyExtractor={(item, index) => index.toString()}
            />
        );

    }

}

const mapStateToProps = (state, ownProps) => {

    // Locate the station and date in the EPG

    const currentDay = state.epg.currentDay;
    const currentStation = state.epg.currentStation;

    return {
        listings: state.stations[currentStation].epg[currentDay],
        stationTimezone: state.stations[currentStation].timezone,
        userTimezone: state.timezone,
        currentDay: currentDay,
        navigation: ownProps.navigation
    };

}

export default connect(mapStateToProps)(EpgList);