/**
 * Tests the settings screen.
 */

import React from 'react';
import Settings from '../components/Settings';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { generateTheme } from '../branding/branding';
import { Provider } from 'react-redux';

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

it('renders-off-off', () => {

    const store = mockStore({
        theme: generateTheme(false),
        settings: {
            darkMode: false,
            highBitrate: false
        }
    });

    const settings = renderer.create(
        <Provider store={store}>
            <Settings />
        </Provider>
    ).toJSON();

    expect(settings).toMatchSnapshot();

});

it('renders-off-on', () => {

    const store = mockStore({
        theme: generateTheme(false),
        settings: {
            darkMode: false,
            highBitrate: true
        }
    });

    const settings = renderer.create(
        <Provider store={store}>
            <Settings />
        </Provider>
    ).toJSON();

    expect(settings).toMatchSnapshot();

});

it('renders-on-off', () => {

    const store = mockStore({
        theme: generateTheme(true),
        settings: {
            darkMode: true,
            highBitrate: false
        }
    });

    const settings = renderer.create(
        <Provider store={store}>
            <Settings />
        </Provider>
    ).toJSON();

    expect(settings).toMatchSnapshot();

});

it('renders-on-on', () => {

    const store = mockStore({
        theme: generateTheme(true),
        settings: {
            darkMode: true,
            highBitrate: true
        }
    });

    const settings = renderer.create(
        <Provider store={store}>
            <Settings />
        </Provider>
    ).toJSON();

    expect(settings).toMatchSnapshot();

});