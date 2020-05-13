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