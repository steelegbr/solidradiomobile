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