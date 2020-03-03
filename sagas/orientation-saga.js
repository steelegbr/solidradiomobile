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