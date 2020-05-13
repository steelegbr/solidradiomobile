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