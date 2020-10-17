/**
 * Tests the presenter list component(s).
 */

import React from 'react';
import PresentersList from '../components/PresentersList';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

// Tests

it('renders', () => {

    // Arrange

    const mockStore = configureStore([]);
    const store = mockStore({
        stationNames: ['Foo FM', 'FooBar AM'],
        presenters: {
            currentStation: 'Foo FM',
            stations: {
                'Foo FM': [
                    {
                        name: 'Bob Agg',
                        image: 'bob_agg.png',
                        biography: 'Dangling round in the wrong places.'
                    },
                    {
                        name: 'Garry Baldy',
                        image: 'garry_baldy.gif',
                        biography: 'Sleak up top.'
                    },
                    {
                        name: 'Tessa Tickle',
                        image: 'tessa_tickle.jpg',
                        biography: 'Making you laugh!'
                    }
                ]
            }
        }
    });

    // Act 

    const presentersList = renderer.create(
        <Provider store={store}>
            <PresentersList />
        </Provider>
    ).toJSON();

    // Assert

    expect(presentersList).toMatchSnapshot();

});