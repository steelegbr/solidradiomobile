/**
 * Solid Radio Sagas
 */

import remoteConfig from '@react-native-firebase/remote-config';
import { call, put, takeEvery, takeLatest, all, delay } from 'redux-saga/effects';
import crashlytics from '@react-native-firebase/crashlytics';

export const INITIAL_LOAD_REQUESTED = 'solidradio/INITIAL_LOAD_REQUESTED';
export const INITIAL_LOAD_START = 'solidradio/INITIAL_LOAD_START';
export const INITIAL_LOAD_API = 'solidradio/INITIAL_LOAD_API';
export const INTIIAL_LOAD_SUCCESS = 'solidradio/INITIAL_LOAD_SUCCESS';
export const INITIAL_LOAD_FAILED = 'solidradio/INITIAL_LOAD_FAILED';
export const STATION_LOAD_START = 'solidradio/STATION_LOAD_START';

defaultState = { 
    initialLoad: 'not_started',
    api : {
        server: null,
        key: null
    },
    stations: {},
    currentStation: null
}

export function reducer(state=defaultState, action) {

    switch (action.type) {
        case INITIAL_LOAD_START:
            return {
                 ...state, 
                 initialLoad: 'started'
            };
        case INITIAL_LOAD_API:
            return { 
                ...state,
                api: {
                    server: action.server,
                    key: action.key
                }
            };
        case INTIIAL_LOAD_SUCCESS:
            return {
                ...state,
                intial: 'success'
            };
        case INITIAL_LOAD_FAILED:
            return {
                ...state,
                initialLoad: 'error',
                error: action.error
            };
        default:
            return state;
    }

}

/**
 * Starts the initial application load.
 */

export function initialLoad() {
    return {
        type: INITIAL_LOAD_REQUESTED
    };
}

/**
 * The initial load worker saga.
 */

function* initialLoadSaga() {

    try {

        // Let everyone know we've started the process

        yield put({ type: INITIAL_LOAD_START });

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

        yield put(
            { 
                type: INITIAL_LOAD_API,
                server: server,
                key: key
            }
        );

        // Trigger the parallel station loads

        const stationNames = settings.stations.value.split('|');
        for (let i = 0; i < stationNames.length; i++) {
            yield put({
                type: STATION_LOAD_START,
                name: stationNames[i]
            });
        }

    } catch (error) {

        // Let the app know about the error

        yield put({ type: INITIAL_LOAD_FAILED, error: error });

        // Log it out to the analytics system (if we can)

        crashlytics().recordError(error);

    }

}

/**
 * The intial load dispatching saga.
 */

function* watchInitialLoad() {
    yield takeLatest(INITIAL_LOAD_REQUESTED, initialLoadSaga);
}

/**
 * Loads a station from the API.
 */

function* loadStation(action) {
    console.log(action);
}

/**
 * The station load dispatching saga.
 */

function* watchStationLoad() {
    yield takeEvery(STATION_LOAD_START, loadStation);
}

/**
 * The root saga that triggers all the others.
 */

export function* rootSaga() {
    yield all([
        watchInitialLoad(),
        watchStationLoad()
    ]);
}