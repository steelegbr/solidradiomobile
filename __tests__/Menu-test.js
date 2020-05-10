/**
 * Tests the menu bar.
 */

import React from 'react';
import Menu from '../components/Menu';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { generateTheme } from '../branding/branding';
import { Provider } from 'react-redux';

// Store

const mockStore = configureStore([]);

it('renders-default', () => {

    const store = mockStore({
        theme: generateTheme(false)
    });

    const menu = renderer.create(
        <Provider store={store}>
            <Menu />
        </Provider>
    ).toJSON();
    expect(menu).toMatchSnapshot();

});

// Tests

it('renders-darkmode', () => {

    const store = mockStore({
        theme: generateTheme(true)
    });

    const menu = renderer.create(
        <Provider store={store}>
            <Menu />
        </Provider>
    ).toJSON();
    expect(menu).toMatchSnapshot();

});