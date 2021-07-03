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
 * Tests the station details card on the main carousel.
 */

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import StationCard from '../components/StationCard';
import { Button } from 'react-native-paper';
import { mount } from 'enzyme';
import { generateTheme } from '../branding/branding';

// Redux

const mockStore = configureStore([]);
const testStationName = 'Test Station';

// Tests

it('render-vertical-mobile', () => {

    // Arrange

    const store = mockStore({
        stations: {
            'Test Station': {
                name: testStationName,
                logo_inverse: 'logo_inverse.png',
                primary_colour: '#ff00000',
                text_color: '#000000',
                logo_square: 'logo_square.png',
                nowPlaying: {
                    artist: 'Current Artist',
                    title: 'Current Title'
                },
                onAir: {
                    show: 'Super Show',
                    description: 'The show that is totally super!',
                    image: 'show.png'
                },
            }
        },
        theme: generateTheme(false),
        vertical: true,
        tablet: false,
        settings: {
            darkMode: false
        }
    });

    // Act

    const stationCard = renderer.create(
        <Provider store={store}>
            <StationCard stationName={testStationName} />
        </Provider>
    ).toJSON();

    // Assert

    expect(stationCard).toMatchSnapshot();

});

it('render-horizontal-mobile', () => {

    // Arrange

    const store = mockStore({
        stations: {
            'Test Station': {
                name: testStationName,
                logo_inverse: 'logo_inverse.png',
                primary_colour: '#ff00000',
                text_color: '#000000',
                logo_square: 'logo_square.png',
                nowPlaying: {
                    artist: 'Current Artist',
                    title: 'Current Title'
                },
                onAir: {
                    show: 'Super Show',
                    description: 'The show that is totally super!',
                    image: 'show.png'
                },
            }
        },
        theme: generateTheme(false),
        vertical: false,
        tablet: false,
        settings: {
            darkMode: false
        }
    });

    // Act

    const stationCard = renderer.create(
        <Provider store={store}>
            <StationCard stationName={testStationName} />
        </Provider>
    ).toJSON();

    // Assert

    expect(stationCard).toMatchSnapshot();

});

it('render-vertical-tablet', () => {

    // Arrange

    const store = mockStore({
        stations: {
            'Test Station': {
                name: testStationName,
                logo_inverse: 'logo_inverse.png',
                primary_colour: '#ff00000',
                text_color: '#000000',
                logo_square: 'logo_square.png',
                nowPlaying: {
                    artist: 'Current Artist',
                    title: 'Current Title'
                },
                onAir: {
                    show: 'Super Show',
                    description: 'The show that is totally super!',
                    image: 'show.png'
                },
            }
        },
        theme: generateTheme(false),
        vertical: true,
        tablet: true,
        settings: {
            darkMode: false
        }
    });

    // Act

    const stationCard = renderer.create(
        <Provider store={store}>
            <StationCard stationName={testStationName} />
        </Provider>
    ).toJSON();

    // Assert

    expect(stationCard).toMatchSnapshot();

});

it('render-horizontal-tablet', () => {

    // Arrange

    const store = mockStore({
        stations: {
            'Test Station': {
                name: testStationName,
                logo_inverse: 'logo_inverse.png',
                primary_colour: '#ff00000',
                text_color: '#000000',
                logo_square: 'logo_square.png',
                nowPlaying: {
                    artist: 'Current Artist',
                    title: 'Current Title',
                    artUrl: 'art.png'
                },
                onAir: {
                    show: 'Super Show',
                    description: 'The show that is totally super!',
                    image: 'show.png'
                },
            }
        },
        theme: generateTheme(false),
        vertical: false,
        tablet: true,
        settings: {
            darkMode: false
        }
    });

    // Act

    const stationCard = renderer.create(
        <Provider store={store}>
            <StationCard stationName={testStationName} />
        </Provider>
    ).toJSON();

    // Assert

    expect(stationCard).toMatchSnapshot();

});

it('render-image-fallback', () => {

    // Arrange

    const store = mockStore({
        stations: {
            'Test Station': {
                name: testStationName,
                logo_inverse: 'logo_inverse.png',
                primary_colour: '#ff00000',
                text_color: '#000000',
                logo_square: 'logo_square.png',
                nowPlaying: {
                    artist: 'Current Artist',
                    title: 'Current Title'
                },
                onAir: {
                    show: 'Super Show',
                    description: 'The show that is totally super!',
                    image: null
                },
            }
        },
        theme: generateTheme(false),
        vertical: true,
        tablet: false,
        settings: {
            darkMode: false
        }
    });

    // Act

    const stationCard = renderer.create(
        <Provider store={store}>
            <StationCard stationName={testStationName} />
        </Provider>
    ).toJSON();

    // Assert

    expect(stationCard).toMatchSnapshot();

});

it('render-show-fallback', () => {

    // Arrange

    const store = mockStore({
        stations: {
            'Test Station': {
                name: testStationName,
                logo_inverse: 'logo_inverse.png',
                primary_colour: '#ff00000',
                text_color: '#000000',
                logo_square: 'logo_square.png',
                nowPlaying: {
                    artist: 'Current Artist',
                    title: 'Current Title'
                },
                onAir: {
                    show: null,
                    description: 'The show that is totally super!',
                    image: 'show.png'
                },
            }
        },
        theme: generateTheme(false),
        vertical: true,
        tablet: false,
        settings: {
            darkMode: false
        }
    });

    // Act

    const stationCard = renderer.create(
        <Provider store={store}>
            <StationCard stationName={testStationName} />
        </Provider>
    ).toJSON();

    // Assert

    expect(stationCard).toMatchSnapshot();

});

it('choose-station-vertical', () => {

    // Arrange

    const store = mockStore({
        stations: {
            'Test Station': {
                name: testStationName,
                logo_inverse: 'logo_inverse.png',
                primary_colour: '#ff00000',
                text_color: '#000000',
                logo_square: 'logo_square.png',
                nowPlaying: {
                    artist: 'Current Artist',
                    title: 'Current Title'
                },
                onAir: {
                    show: 'Super Show',
                    description: 'The show that is totally super!',
                    image: 'show.png'
                },
            }
        },
        theme: generateTheme(false),
        vertical: true,
        tablet: false,
        settings: {
            darkMode: false
        }
    });

    // Act

    const stationCard = mount(
        <Provider store={store}>
            <StationCard stationName={testStationName} />
        </Provider>
    );

    stationCard.find(Button).first().props().onPress();

    // Assert

    const expectedActions = [
        { "type": "SET_CURRENT_STATION", "station": testStationName },
        { "type": "LOAD_PLAYER_STATION", "stationName": testStationName },
    ];

    expect(store.getActions()).toStrictEqual(expectedActions);

});

it('choose-station-horizontal', () => {

    // Arrange

    const store = mockStore({
        stations: {
            'Test Station': {
                name: testStationName,
                logo_inverse: 'logo_inverse.png',
                primary_colour: '#ff00000',
                text_color: '#000000',
                logo_square: 'logo_square.png',
                nowPlaying: {
                    artist: 'Current Artist',
                    title: 'Current Title'
                },
                onAir: {
                    show: 'Super Show',
                    description: 'The show that is totally super!',
                    image: 'show.png'
                },
            }
        },
        theme: generateTheme(false),
        vertical: false,
        tablet: false,
        settings: {
            darkMode: false
        }
    });

    // Act

    const stationCard = mount(
        <Provider store={store}>
            <StationCard stationName={testStationName} />
        </Provider>
    );

    stationCard.find(Button).first().props().onPress();

    // Assert

    const expectedActions = [
        { "type": "SET_CURRENT_STATION", "station": testStationName },
        { "type": "LOAD_PLAYER_STATION", "stationName": testStationName },
    ];

    expect(store.getActions()).toStrictEqual(expectedActions);

});