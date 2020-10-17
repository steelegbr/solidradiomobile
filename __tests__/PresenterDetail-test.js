/**
 * Tests the presenter details screen.
 */

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import PresenterDetail from '../components/PresenterDetail';
import { generateTheme } from '../branding/branding';

// Redux

const mockStore = configureStore([]);

// Tests

it.each`
name | image | biography | darkMode
${'Bob Agg'} | ${'bob_agg.png'} | ${'<p>Dangling in the dark.</p>'} | ${true}
${'Tessa Tickle'} | ${'tessa_tickle.jpg'} | ${'<p>Bringing light down under.</p><p>And even with a second paragraph!</p>'} | ${false}
`('render-show', ({ name, image, biography, darkMode }) => {
    // Arrange

    const store = mockStore({
        theme: generateTheme(darkMode)
    });

    const presenter = {
        name: name,
        image: image,
        biography: biography
    }

    const route = {
        params: {
            presenter: presenter
        }
    };

    // Act

    const presenterRender = renderer.create(
        <Provider store={store}>
            <PresenterDetail
                route={route}
            />
        </Provider>
    ).toJSON();

    // Assert

    expect(presenterRender).toMatchSnapshot();

});
