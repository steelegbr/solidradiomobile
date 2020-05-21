/**
 * Tests the loading splash screen.
 */

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import SplashScreen from '../components/SplashScreen';
import { Button } from 'react-native-paper';
import { mount } from 'enzyme';

// Redux

const mockStore = configureStore([]);

// Tests

it('render-not-started', () => {

    // Arrange

    const store = mockStore({
        initialLoad: 'not_started'
    });

    // Act

    const splashScreen = renderer.create(
        <Provider store={store}>
            <SplashScreen />
        </Provider>
    ).toJSON();

    // Assert

    expect(splashScreen).toMatchSnapshot();

});

it('render-started', () => {

    // Arrange

    const store = mockStore({
        initialLoad: 'started'
    });

    // Act

    const splashScreen = renderer.create(
        <Provider store={store}>
            <SplashScreen />
        </Provider>
    ).toJSON();

    // Assert

    expect(splashScreen).toMatchSnapshot();

});

it('render-success', () => {

    // Arrange

    const store = mockStore({
        initialLoad: 'success'
    });

    // Act

    const splashScreen = renderer.create(
        <Provider store={store}>
            <SplashScreen />
        </Provider>
    ).toJSON();

    // Assert

    expect(splashScreen).toMatchSnapshot();

});

it('render-error', () => {

    // Arrange

    const store = mockStore({
        initialLoad: 'error'
    });

    // Act

    const splashScreen = renderer.create(
        <Provider store={store}>
            <SplashScreen />
        </Provider>
    ).toJSON();

    // Assert

    expect(splashScreen).toMatchSnapshot();

});

it('retry-pressed', () => {

    // Arrange

    const store = mockStore({
        initialLoad: 'error'
    });

    const splashScreen = mount(
        <Provider store={store}>
            <SplashScreen />
        </Provider>
    );

    // Act

    splashScreen.find(Button).first().props().onPress();

    // Assert

    const expectedActions = [ { "type": "INITIAL_LOAD_REQUESTED" } ];
    expect(store.getActions()).toStrictEqual(expectedActions);

});