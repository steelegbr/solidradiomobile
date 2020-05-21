/**
 * Tests the authentication token intercept in Axios.
 */

import { axiosConfig } from '../middleware/auth-token';
import configureStore from 'redux-mock-store';

// Redux

const mockStore = configureStore([]);

// Tests

it('intercept', () => {

    // Arrange

    const store = mockStore({
        api: {
            server: 'test.example.com',
            key: 'fake-token-value-1234'
        }
    });

    const config = {
        getState: store.getState,
        dispatch: null,
        getSourceAction: null
    };

    let request = {
        url: '/foo/bar/',
        headers: {
            common: {

            }
        }
    };

    // Act

    const intercepted = axiosConfig.interceptors.request[0](config, request);

    // Assert

    const expected = {
        url: 'https://test.example.com/foo/bar/',
        headers: { common: { Authorization: 'Token fake-token-value-1234' } }
    };

    expect(intercepted).toStrictEqual(expected);

})