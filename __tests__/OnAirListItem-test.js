/**
 * Tests the on air list item.
 */

import React from 'react';
import OnAirListItem from '../components/OnAirListItem';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

// Redux

const mockStore = configureStore([]);
let store;

beforeEach(() => {
    store = mockStore({});
});

// Tests

it('renders', () => {

    const station ={ 
        onAir: {
            show: "Test Show",
            description: "A really good test description.",
            image: "art.png"
        }
    };

    const onAirItem = renderer.create(
        <Provider store={store}>
            <OnAirListItem station={station} />
        </Provider>
    ).toJSON();
    expect(onAirItem).toMatchSnapshot();

});
