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
let store;

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

// Tests

it('renders', () => {

    const playerList = renderer.create(
        <Provider store={store}>
            <PlayerList />
        </Provider>
    ).toJSON();
    
    expect(playerList).toMatchSnapshot();

});
