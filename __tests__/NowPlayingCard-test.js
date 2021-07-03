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
 * Tests the now playing carousel card.
 */

import React from 'react';
import NowPlayingCard from '../components/NowPlayingCard';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

// Redux

const mockStore = configureStore([]);
let store;

beforeEach(() => {
    store = mockStore({
        settings: {
            darkMode: false
        }
    });
});

// Tests

it('renders-with-art', () => {

    const nowPlaying = {
        artist: "Test Artist",
        title: "Test Title",
        artUrl: "art.png"
    };

    const station = {
        logo_square: "logo.png"
    };

    const nowPlayingCard = renderer.create(
        <Provider store={store}>
            <NowPlayingCard nowPlaying={nowPlaying} station={station} />
        </Provider>
    ).toJSON();
    expect(nowPlayingCard).toMatchSnapshot();

});

it('renders-fallback-art', () => {

    const nowPlaying = {
        artist: "Test Artist",
        title: "Test Title",
        artUrl: null
    };

    const station = {
        logo_square: "logo.png",
        primary_colour: "#ff0000"
    };

    const nowPlayingCard = renderer.create(
        <Provider store={store}>
            <NowPlayingCard nowPlaying={nowPlaying} station={station} />
        </Provider>
    ).toJSON();

    expect(nowPlayingCard).toMatchSnapshot();

});