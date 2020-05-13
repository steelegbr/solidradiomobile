/**
 * Tests the play/pause button.
 */

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import PlayPauseButton from '../components/PlayPauseButton';
import { PlayerState } from '../audio/player';

// Mocks

jest.mock("react-native-paper", () => ({
    ActivityIndicator: "ActivityIndicator",
    DefaultTheme: {
        colors: {
            
        }
    }
}));

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

// Tests

it('renders-unitialised', () => {

    const store = mockStore({
        theme: {
            colors: {
                primary: "#ff0000"
            }
        },
        player: {
            state: PlayerState.UNINITIALISED
        }
    });

    const playPauseButton = renderer.create(
        <Provider store={store}>
            <PlayPauseButton />
        </Provider>
    ).toJSON();
    
    expect(playPauseButton).toMatchSnapshot();

});

it('renders-idle', () => {

    const store = mockStore({
        theme: {
            colors: {
                primary: "#ff0000"
            }
        },
        player: {
            state: PlayerState.IDLE
        }
    });

    const playPauseButton = renderer.create(
        <Provider store={store}>
            <PlayPauseButton />
        </Provider>
    ).toJSON();
    
    expect(playPauseButton).toMatchSnapshot();

});

it('renders-error', () => {

    const store = mockStore({
        theme: {
            colors: {
                primary: "#ff0000"
            }
        },
        player: {
            state: PlayerState.ERROR
        }
    });

    const playPauseButton = renderer.create(
        <Provider store={store}>
            <PlayPauseButton />
        </Provider>
    ).toJSON();
    
    expect(playPauseButton).toMatchSnapshot();

});

it('renders-paused', () => {

    const store = mockStore({
        theme: {
            colors: {
                primary: "#ff0000"
            }
        },
        player: {
            state: PlayerState.PAUSED
        }
    });

    const playPauseButton = renderer.create(
        <Provider store={store}>
            <PlayPauseButton />
        </Provider>
    ).toJSON();
    
    expect(playPauseButton).toMatchSnapshot();

});

it('renders-playing', () => {

    const store = mockStore({
        theme: {
            colors: {
                primary: "#ff0000"
            }
        },
        player: {
            state: PlayerState.PLAYING
        }
    });

    const playPauseButton = renderer.create(
        <Provider store={store}>
            <PlayPauseButton />
        </Provider>
    ).toJSON();
    
    expect(playPauseButton).toMatchSnapshot();

});

it('renders-loading', () => {

    const store = mockStore({
        theme: {
            colors: {
                primary: "#ff0000"
            }
        },
        player: {
            state: PlayerState.LOADING
        }
    });

    const playPauseButton = renderer.create(
        <Provider store={store}>
            <PlayPauseButton />
        </Provider>
    ).toJSON();
    
    expect(playPauseButton).toMatchSnapshot();

});

