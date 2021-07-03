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
 * Saga for handling screen orientation changes.
 */

import { Dimensions } from 'react-native';
import { eventChannel, END } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import { changeOrientation, setTablet } from '../reducers/actions';
import DeviceInfo from 'react-native-device-info';

/**
 * Indicates if the screen is vertical.
 */

function isVertical() {
    const currentDimensions = Dimensions.get('screen');
    return currentDimensions.height >= currentDimensions.width;
}

/**
 * Initial setup of the dimensions watcher channel.
 */

function setupDimensionChannel() {
    return eventChannel(emit => {

        // Setup the event handler for changes

        const changeHandler = () => {
            emit(isVertical());
        }

        Dimensions.addEventListener('change', changeHandler);

        // Emit on setup

        emit(isVertical());

        // Provide an opt out

        const unsubscribe = () => {
            Dimensions.removeEventListener('change', changeHandler);
        }

        return unsubscribe;

    });
}

/**
 * The actual orientation change saga.
 */

export function* orientationSaga() {

    // Indicate if we are a tablet or not

    yield put(setTablet(DeviceInfo.isTablet()));

    // Continue on

    const channel = yield call(setupDimensionChannel);
    while (true) {
        let vertical = yield take(channel);
        yield put(changeOrientation(vertical));
    }

}