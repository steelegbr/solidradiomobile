/**
 * Tests the Chromecast button.
 */

import React from 'react';
import CastButton from '../components/CastButton';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { generateTheme } from '../branding/branding';
import { Provider } from 'react-redux';

const mockStore = configureStore([]);
let store;

beforeEach(() => {
    store = mockStore({
        theme: generateTheme(false)
    });
});

it('renders-default', () => {

    const castButton = renderer.create(
        <Provider store={store}>
            <CastButton />
        </Provider>
    ).toJSON();
    expect(castButton).toMatchSnapshot();

});

it('renders-bigmode', () => {

    const castButton = renderer.create(
        <Provider store={store}>
            <CastButton bigMode={true} iconSize={32} />
        </Provider>
    ).toJSON();
    expect(castButton).toMatchSnapshot();

});