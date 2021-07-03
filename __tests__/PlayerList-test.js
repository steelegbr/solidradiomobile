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
 * Tests the list view for Android.
 */

import React from 'react';
import PlayerList from '../components/PlayerList';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

// Redux

const mockStore = configureStore([]);

// Tests

describe('streaming', () => {

    beforeEach(() => {
        store = mockStore({
            stations: {
                "Test Station": {
                    onAir: {
                        show: "Test Show",
                        description: "A really good test description.",
                        image: "art.png"
                    },
                    nowPlaying: {
                        artist: "Test Artist",
                        title: "Test Title",
                        artUrl: null
                    }
                }
            },
            player: {
                playlist: [
                    {
                        type: "station",
                        name: "Test Station"
                    }
                ],
                currentItem: 0
            },
            settings: {
                darkMode: true
            }
        });

    });

    it('renders', () => {

        const playerList = renderer.create(
            <Provider store={store}>
                <PlayerList />
            </Provider>
        ).toJSON();

        expect(playerList).toMatchSnapshot();

    });

});

describe('podcasts', () => {

    beforeEach(() => {
        store = mockStore({
            player: {
                playlist: [
                    {
                        type: "podcast"
                    }
                ],
                currentItem: 0
            },
            settings: {
                darkMode: true
            }
        });

    });

    it('renders', () => {

        const playerList = renderer.create(
            <Provider store={store}>
                <PlayerList />
            </Provider>
        ).toJSON();

        expect(playerList).toMatchSnapshot();

    });

});