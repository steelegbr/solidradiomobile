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
 * Tests the now playing list item.
 */

import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import NowPlayingListItem from '../components/NowPlayingListItem';

// Redux

let store;
const mockStore = configureStore([]);

beforeEach(() => {
    store = mockStore({});
});

// Tests

it('renders-with-art', () => {

    const station = {
        logo_square: "logo.png",
        nowPlaying: {
            artist: "Test Artist",
            title: "Test Title",
            artUrl: "art.png"
        }
    };

    const nowPlayingItem = renderer.create(
        <Provider store={store}>
            <NowPlayingListItem station={station} />
        </Provider>
    ).toJSON();
    expect(nowPlayingItem).toMatchSnapshot();

});

it('renders-fallback-art', () => {

    const station = {
        logo_square: "logo.png",
        primary_colour: "#ff0000",
        nowPlaying: {
            artist: "Test Artist",
            title: "Test Title",
            artUrl: null
        }
    };

    const nowPlayingItem = renderer.create(
        <Provider store={store}>
            <NowPlayingListItem station={station} />
        </Provider>
    ).toJSON();

    expect(nowPlayingItem).toMatchSnapshot();

});