/**
 * Tests the player overlay slider.
 */

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import PlayerOverlay from '../components/PlayerOverlay';
import { PlayerState } from '../audio/player';
import { Platform } from 'react-native';
import { generateTheme } from '../branding/branding';

// Mocks

jest.mock("../components/PlayerOverlayControls", () => {});

// Firebase

jest.mock("@react-native-firebase/admob", () => ({
    AdsConsentStatus: {
        UNKNOWN: 0,
        NON_PERSONALIZED: 1,
        PERSONALISED: 2
    },
    TestIds: {
        BANNER: "bannerTestId"
    },
    BannerAdSize: {
        SMART_BANNER: "SMART_BANNER"
    },
    BannerAd: "BannerAd"
}));

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
        theme: generateTheme(false)
    });
});

// Tests

it('renders-android', () => {

    Platform.OS = "android";

    const playerOverlay = renderer.create(
        <Provider store={store}>
            <PlayerOverlay />
        </Provider>
    ).toJSON();

    expect(playerOverlay).toMatchSnapshot();

});