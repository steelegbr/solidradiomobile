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
 * Tests the presenter details screen.
 */

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import PresenterDetail from '../components/PresenterDetail';
import { generateTheme } from '../branding/branding';

// Redux

const mockStore = configureStore([]);

// Tests

it.each`
name | image | biography | darkMode
${'Bob Agg'} | ${'bob_agg.png'} | ${'<p>Dangling in the dark.</p>'} | ${true}
${'Tessa Tickle'} | ${'tessa_tickle.jpg'} | ${'<p>Bringing light down under.</p><p>And even with a second paragraph!</p>'} | ${false}
`('render-show', ({ name, image, biography, darkMode }) => {
    // Arrange

    const store = mockStore({
        theme: generateTheme(darkMode)
    });

    const presenter = {
        name: name,
        image: image,
        biography: biography
    }

    const route = {
        params: {
            presenter: presenter
        }
    };

    // Act

    const presenterRender = renderer.create(
        <Provider store={store}>
            <PresenterDetail
                route={route}
            />
        </Provider>
    ).toJSON();

    // Assert

    expect(presenterRender).toMatchSnapshot();

});
