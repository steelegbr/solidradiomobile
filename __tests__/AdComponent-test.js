/**
 * Tests ad component rendering.
 */

import React from 'react';
import AdComponent from '../components/AdComponent';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { generateTheme } from '../branding/branding';

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

// Store

const mockStore = configureStore([]);
let store;

beforeEach(() => {
    store = mockStore({
        admob: {
            consent: 2,
            units: {
                "testUnitName": "testUnitId"
            }
        },
        theme: generateTheme(false)
    });
});

// Tests

it('renders-correctly', () => {

    const ad = renderer.create(
        <Provider store={store}>
            <AdComponent unitId="testUnitName" />
        </Provider>
    ).toJSON();
    expect(ad).toMatchSnapshot();

});