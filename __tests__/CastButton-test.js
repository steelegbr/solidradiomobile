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
 * Tests the Chromecast button.
 */

import React from 'react';
import CastButton from '../components/CastButton';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { generateTheme } from '../branding/branding';
import { Provider } from 'react-redux';

const mockStore = configureStore([]);
let store;

beforeEach(() => {
    store = mockStore({
        theme: generateTheme(false)
    });
});

it('renders-default', () => {

    const castButton = renderer.create(
        <Provider store={store}>
            <CastButton />
        </Provider>
    ).toJSON();
    expect(castButton).toMatchSnapshot();

});

it('renders-bigmode', () => {

    const castButton = renderer.create(
        <Provider store={store}>
            <CastButton bigMode={true} iconSize={32} />
        </Provider>
    ).toJSON();
    expect(castButton).toMatchSnapshot();

});