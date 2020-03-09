/**
 * On Air Saga.
 */


import { put, all, takeEvery, sleep } from 'redux-saga/effects';
import { loadOnAir, getStationNameFromOnAir, STATION_LOAD_SUCCESS, ONAIR_LOAD_FAIL, ONAIR_LOAD_SUCCESS } from '../reducers/actions';
import crashlytics from '@react-native-firebase/crashlytics';

/**
 * Triggers the currently on air information for a specific station.
 * @param {action} action The action triggering this call.
 */

function* getOnAirFromStationLoad(action) {

    const station = action.payload.data;
    const stationName = station.name;

    yield put(loadOnAir(stationName));

}

/**
 * Handles every on air information load failure.
 * @param {action} action The failed action.
 */

function* onAirLoadFailure(action) {

    // Log the initial error

    const stationName = getStationNameFromOnAir(action);
    crashlytics().log(`Failed to load the on air information for ${stationName}.`);
    crashlytics().recordError(action.error);

    // Sleep it off and try again

    const currentState = yield select();
    yield sleep(currentState.backOffTime);
    yield put(loadOnAir(stationName));

}

/**
 * Hadles every on air information load success.
 * @param {action} action The successful action.
 */

function* onAirLoadSuccess(action) {

    // Figure out the station

    const stationName = getStationNameFromOnAir(action);
    console.log(`Successfully loaded the on air information for ${stationName}.`);

    // Sleep it off until the next hour

    const currentState = yield select();
    const now = new Date();
    const sleepMins = 60 - now.getMinutes();
    const sleepSecs = 61 - now.getSeconds();
    const sleepTime = 60 * sleepMins + sleepSecs + Math.ceil(Math.random() * currentState.backOffTime);

    console.log(`Sleeping off for ${sleepTime} seconds.`);
    yield sleep(sleepTime);
    yield put(loadOnAir(stationName));

}

export function* watchOnAir() {
    yield all([
        takeEvery(STATION_LOAD_SUCCESS, getOnAirFromStationLoad),
        takeEvery(ONAIR_LOAD_FAIL, onAirLoadFailure),
        takeEvery(ONAIR_LOAD_SUCCESS, onAirLoadSuccess)
    ]);
}