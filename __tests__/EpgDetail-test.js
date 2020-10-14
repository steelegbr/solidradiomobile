/**
 * Tests the EPG details screen.
 */

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import EpgDetail from '../components/EpgDetail';
import { Button } from 'react-native-paper';
import { mount } from 'enzyme';
import { generateTheme } from '../branding/branding';

// Redux

const mockStore = configureStore([]);
const testStationName = 'Test Station';

// Tests

it.each`
stationTimezone | userTimezone | title | image | description | day | start
${'Europe/London'} | ${'Europe/London'} | ${"Night Shift"} | ${"https://www.solidradio.co.uk/wp-content/uploads/2019/08/31548926930_f1a1103e5f_o.jpg"} | ${"We don’t bore you with soppy love songs through the night shift. Instead, enjoy a great mix of songs, all night long."} | ${0} | ${"00:00:00"}
${'Europe/London'} | ${'America/Los_Angeles'} | ${"Solid Country"} | ${"https://www.solidradio.co.uk/wp-content/uploads/2020/04/guitar-839168_1920.jpg"} | ${"Join Stephen as he plays a mix of country hits new and old."} | ${6} | ${"10:00:00"}
`('render-show', ({ stationTimezone, userTimezone, title, image, description, day, start }) => {
    // Arrange

    const store = mockStore({
        stations: {
            'Test Station': {
                timeZone: stationTimezone
            }
        },
        currentStation: 'Test Station',
        timezone: userTimezone
    });

    const listing = {
        title: title,
        description: description,
        image: image,
        start: start
    };

    const route = {
        params: {
            listing: listing,
            day: day
        }
    };

    // Act

    const epgRender = renderer.create(
        <Provider store={store}>
            <EpgDetail
                route={route}
            />
        </Provider>
    ).toJSON();

    // Assert

    expect(epgRender).toMatchSnapshot();

});
