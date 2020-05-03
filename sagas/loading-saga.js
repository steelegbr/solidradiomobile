/**
 * Initial Application Loading Saga
 */

import remoteConfig from '@react-native-firebase/remote-config';
import { put, takeLatest, all, takeEvery, select } from 'redux-saga/effects';
import crashlytics from '@react-native-firebase/crashlytics';
import { initialLoadStarted, setApiParams, loadStation, initialLoadFailure, setStationNameList, INITIAL_LOAD_REQUESTED, STATION_LOAD_FAIL, setAdMobPublisher } from '../reducers/actions';

/**
 * The initial load worker saga.
 */

function* initialLoadSaga() {

    try {

        // Let everyone know we've started the process

        yield put(initialLoadStarted());

        // Request the settings

        yield remoteConfig().setConfigSettings({
            isDeveloperModeEnabled: __DEV__
        });

        yield remoteConfig().fetchAndActivate();
        const settings = yield remoteConfig().getAll();

        // Extract the API settings

        if (!('server' in settings && 'key' in settings && 'stations' in settings)) {
            throw 'Missing API settings from remote configuration.';
        }

        const server = settings.server.value;
        const key = settings.key.value;
        const admobPublisherId = settings.admob_publisher_id.value;

        yield put(setApiParams(server, key));
        yield put(setAdMobPublisher(admobPublisherId));

        // Trigger the parallel station loads

        const stationNames = JSON.parse(settings.stations.value);
        yield put(setStationNameList(stationNames));

        for (let i = 0; i < stationNames.length; i++) {
            yield put(loadStation(stationNames[i]));
        }

    } catch (error) {

        // Let the app know about the error

        yield put(initialLoadFailure(error));

        // Log it out to the analytics system (if we can)

        crashlytics().recordError(error);

    }

}

/**
 * Handles the failure to load a station from the API.
 * @param {action} action The action from the failed API call.
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
 * The intial load dispatching saga.
 */

export function* watchInitialLoad() {
    yield all([
        yield takeLatest(INITIAL_LOAD_REQUESTED, initialLoadSaga),
        yield takeEvery(STATION_LOAD_FAIL, stationLoadFail)
    ]);
}