/**
    Solid Radio Mobile App
    Copyright (C) 2020-2021 Marc Steele

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

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