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
 * Tests the presenter list component(s).
 */

import React from 'react';
import PresentersList from '../components/PresentersList';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

// Tests

it('renders', () => {

    // Arrange

    const mockStore = configureStore([]);
    const store = mockStore({
        stationNames: ['Foo FM', 'FooBar AM'],
        presenters: {
            currentStation: 'Foo FM',
            stations: {
                'Foo FM': [
                    {
                        name: 'Bob Agg',
                        image: 'bob_agg.png',
                        biography: 'Dangling round in the wrong places.'
                    },
                    {
                        name: 'Garry Baldy',
                        image: 'garry_baldy.gif',
                        biography: 'Sleak up top.'
                    },
                    {
                        name: 'Tessa Tickle',
                        image: 'tessa_tickle.jpg',
                        biography: 'Making you laugh!'
                    }
                ]
            }
        }
    });

    // Act 

    const presentersList = renderer.create(
        <Provider store={store}>
            <PresentersList />
        </Provider>
    ).toJSON();

    // Assert

    expect(presentersList).toMatchSnapshot();

});

it('renders-loading', () => {

    // Arrange

    const mockStore = configureStore([]);
    const store = mockStore({
        stationNames: ['Foo FM', 'FooBar AM'],
        presenters: {
            currentStation: 'Foo FM',
            stations: {}
        }
    });

    // Act 

    const presentersList = renderer.create(
        <Provider store={store}>
            <PresentersList />
        </Provider>
    ).toJSON();

    // Assert

    expect(presentersList).toMatchSnapshot();

});