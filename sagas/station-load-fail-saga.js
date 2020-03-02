/**
 * Station Load Failure Saga
 */

import { select, put, takeEvery } from 'redux-saga/effects';
import crashlytics from '@react-native-firebase/crashlytics';
import { initialLoadFailure, STATION_LOAD_FAIL } from '../reducers/actions';

/**
 * Handles the failure to load a station from the API.
 * @param {action} action 
 */

function* stationLoadFail(action) {
    
    // Log the error to crashalytics

    crashlytics().recordError(action.error);

    // Determine if we're bombing out or not

    const currentState = yield select();
    if (currentState.stationCount == 0) {
        yield put(initialLoadFailure(action.error));
    }

}

/**
 * Watches for every station loading failure.
 */

export function* watchStationLoadFail() {
    yield takeEvery(STATION_LOAD_FAIL, stationLoadFail);
}