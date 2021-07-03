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
 * Tests ad component rendering.
 */

import React from 'react';
import AdComponent, { adFailedToLoad } from '../components/AdComponent';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { generateTheme } from '../branding/branding';
import { mount } from 'enzyme';

// Redux

const mockStore = configureStore([]);
let store;

beforeEach(() => {
    store = mockStore({
        admob: {
            consent: 2,
            units: {
                "testUnitName": "testUnitId"
            }
        },
        theme: generateTheme(false)
    });
});

// Tests

it('renders-correctly', () => {

    // Arrange & Act

    const ad = renderer.create(
        <Provider store={store}>
            <AdComponent unitId="testUnitName" />
        </Provider>
    ).toJSON();

    // Assert

    expect(ad).toMatchSnapshot();

});

it('renders-correctly-production', () => {

    // Arrange

    global.__DEV__ = false;

    // Act

    const ad = renderer.create(
        <Provider store={store}>
            <AdComponent unitId="testUnitName" />
        </Provider>
    ).toJSON();

    // Assert

    expect(ad).toMatchSnapshot();

});

it('load-failure', () => {

    // Arrange

    const ad = mount(
        <Provider store={store}>
            <AdComponent unitId="testUnitName" />
        </Provider>
    )

    // Act

    ad.find('[unitId="testUnitId"]').first().props().adLoadError();

    // Assert

    const expectedActions = [{ "error": undefined, "type": "AD_LOAD_ERROR", "unitId": undefined, }];
    expect(store.getActions()).toStrictEqual(expectedActions);

});
