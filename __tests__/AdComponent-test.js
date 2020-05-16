/**
 * Tests ad component rendering.
 */

import React from 'react';
import AdComponent, { adFailedToLoad } from '../components/AdComponent';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { generateTheme } from '../branding/branding';
import { mount } from 'enzyme';

// Redux

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

    // Arrange & Act

    const ad = renderer.create(
        <Provider store={store}>
            <AdComponent unitId="testUnitName" />
        </Provider>
    ).toJSON();

    // Assert

    expect(ad).toMatchSnapshot();

});

it('renders-correctly-production', () => {

    // Arrange

    global.__DEV__ = false;

    // Act

    const ad = renderer.create(
        <Provider store={store}>
            <AdComponent unitId="testUnitName" />
        </Provider>
    ).toJSON();

    // Assert

    expect(ad).toMatchSnapshot();

});

it('load-failure', () => {

    // Arrange

    const ad = mount(
        <Provider store={store}>
            <AdComponent unitId="testUnitName" />
        </Provider>
    )

    // Act

    ad.find('[unitId="testUnitId"]').first().props().adLoadError();

    // Assert

    const expectedActions = [ { "error": undefined, "type": "AD_LOAD_ERROR", "unitId": undefined, } ];
    expect(store.getActions()).toStrictEqual(expectedActions);

});
