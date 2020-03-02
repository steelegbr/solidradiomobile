/**
 * Initial Application Loading Saga
 */

import remoteConfig from '@react-native-firebase/remote-config';
import { put, takeLatest } from 'redux-saga/effects';
import crashlytics from '@react-native-firebase/crashlytics';
import { initialLoadStarted, setApiParams, loadStation, initialLoadFailure, INITIAL_LOAD_REQUESTED } from '../reducers/actions';

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

        yield put(setApiParams(server, key));

        // Trigger the parallel station loads

        const stationNames = settings.stations.value.split('|');
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
 * The intial load dispatching saga.
 */

export function* watchInitialLoad() {
    yield takeLatest(INITIAL_LOAD_REQUESTED, initialLoadSaga);
}