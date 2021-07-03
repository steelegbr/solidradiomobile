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
 * Tests the settings screen.
 */

import React from 'react';
import Settings from '../components/Settings';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { generateTheme } from '../branding/branding';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

// Redux

const mockStore = configureStore([]);

// Tests

it('renders-off-off', () => {

    const store = mockStore({
        theme: generateTheme(false),
        settings: {
            darkMode: false,
            highBitrate: false
        }
    });

    const settings = renderer.create(
        <Provider store={store}>
            <Settings />
        </Provider>
    ).toJSON();

    expect(settings).toMatchSnapshot();

});

it('renders-off-on', () => {

    const store = mockStore({
        theme: generateTheme(false),
        settings: {
            darkMode: false,
            highBitrate: true
        }
    });

    const settings = renderer.create(
        <Provider store={store}>
            <Settings />
        </Provider>
    ).toJSON();

    expect(settings).toMatchSnapshot();

});

it('renders-on-off', () => {

    const store = mockStore({
        theme: generateTheme(true),
        settings: {
            darkMode: true,
            highBitrate: false
        }
    });

    const settings = renderer.create(
        <Provider store={store}>
            <Settings />
        </Provider>
    ).toJSON();

    expect(settings).toMatchSnapshot();

});

it('renders-on-on', () => {

    const store = mockStore({
        theme: generateTheme(true),
        settings: {
            darkMode: true,
            highBitrate: true
        }
    });

    const settings = renderer.create(
        <Provider store={store}>
            <Settings />
        </Provider>
    ).toJSON();

    expect(settings).toMatchSnapshot();

});

it('dark-mode-change', () => {

    // Arrange

    const originalDarkMode = true;

    let store = mockStore({
        theme: generateTheme(originalDarkMode),
        settings: {
            darkMode: originalDarkMode,
            highBitrate: false
        }
    });

    const settings = mount(
        <Provider store={store}>
            <Settings />
        </Provider>
    );

    // Act

    settings.find('[testID="darkModeToggle"]').first().props().onValueChange();

    // Assert

    const expectedActions = [{ type: 'SET_DARK_MODE', mode: !originalDarkMode }];
    expect(store.getActions()).toStrictEqual(expectedActions);

});

it('high-bitrate-change', () => {

    // Arrange

    const originalHighBitrate = true;

    let store = mockStore({
        theme: generateTheme(false),
        settings: {
            darkMode: false,
            highBitrate: originalHighBitrate
        }
    });

    const settings = mount(
        <Provider store={store}>
            <Settings />
        </Provider>
    );

    // Act

    settings.find('[testID="highBitrateToggle"]').first().props().onValueChange();

    // Assert

    const expectedActions = [{ type: 'SET_HIGH_BITRATE', mode: !originalHighBitrate }];
    expect(store.getActions()).toStrictEqual(expectedActions);

});