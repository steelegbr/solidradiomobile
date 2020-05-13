/**
 * Tests the on air carousel card.
 */

import React from 'react';
import OnAirCard from '../components/OnAirCard';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

// Redux

const mockStore = configureStore([]);
let store;

beforeEach(() => {
    store = mockStore({
        settings: {
            darkMode: false
        }
    });
});

// Tests

it('renders', () => {

    const onAir = {
        show: "Test Show",
        description: "A really good test description.",
        image: "art.png"
    };

    const station = {
        primary_colour: "#ff0000"
    };

    const onAirCard = renderer.create(
        <Provider store={store}>
            <OnAirCard onAir={onAir} station={station} />
        </Provider>
    ).toJSON();
    expect(onAirCard).toMatchSnapshot();

});
