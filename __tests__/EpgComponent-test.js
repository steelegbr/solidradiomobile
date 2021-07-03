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
 * Tests the EPG listings component(s).
 */

import React from 'react';
import EpgList from '../components/EpgList';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

// Tests

it.each`
day | localTimezone | stationTimezone
${0} | ${'Europe/London'} | ${'Europe/London'}
${0} | ${'America/Los_Angeles'} | ${'Europe/London'}
`('renders', ({ day, localTimezone, stationTimezone }) => {

    // Arrange

    const mockStore = configureStore([]);
    const store = mockStore({
        epg: {
            currentDay: day,
            currentStation: 'Foo FM'
        },
        stations: {
            'Foo FM': {
                epg: require('./Epg-Test.json'),
                timezone: stationTimezone
            }
        },
        stationNames: ['Foo FM', 'FooBar AM'],
        timezone: localTimezone
    });

    // Act 

    const epgList = renderer.create(
        <Provider store={store}>
            <EpgList />
        </Provider>
    ).toJSON();

    // Assert

    expect(epgList).toMatchSnapshot();

});