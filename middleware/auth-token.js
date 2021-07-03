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
 * Axios middleware for using authentication tokens.
 */

export const axiosConfig = {
  interceptors: {
    request: [
      function ({ getState, dispatch, getSourceAction }, request) {

        // Interceptor for adding authorisation token and server name to requests

        const currentState = getState();
        request.url = `https://${currentState.api.server}${request.url}`;
        request.headers.common['Authorization'] = `Token ${currentState.api.key}`;

        return request;

      }
    ]
  }
}