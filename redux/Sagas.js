/**
 * Solid Radio Sagas
 */

import remoteConfig from '@react-native-firebase/remote-config';
import { select, put, takeEvery, takeLatest, all } from 'redux-saga/effects';
import crashlytics from '@react-native-firebase/crashlytics';
import { DefaultTheme } from 'react-native-paper';
import produce from 'immer';

export const INITIAL_LOAD_REQUESTED = 'INITIAL_LOAD_REQUESTED';
export const INITIAL_LOAD_START = 'INITIAL_LOAD_START';
export const INITIAL_LOAD_API = 'INITIAL_LOAD_API';
export const INTIIAL_LOAD_SUCCESS = 'INITIAL_LOAD_SUCCESS';
export const INITIAL_LOAD_FAIL = 'INITIAL_LOAD_FAIL';
export const STATION_LOAD_START = 'STATION_LOAD';
export const STATION_LOAD_SUCCESS = 'STATION_LOAD_SUCCESS';
export const STATION_LOAD_FAIL = 'STATION_LOAD_FAIL';

defaultState = { 
    initialLoad: 'not_started',
    api : {
        server: null,
        key: null
    },
    stations: {},
    currentStation: null,
    theme: {
        ...DefaultTheme,
        roundness: 10,
        colours: {
            ...DefaultTheme.colors,
            primary: "#7300AE",
            accent: "#7300AE"
        }
    }
}

export function reducer(baseState=defaultState, action) {

    return produce(baseState, draftState => {
        switch (action.type) {
            case INITIAL_LOAD_START:
                draftState.initialLoad = 'started';
                break;
            case INITIAL_LOAD_API:
                draftState.api =  {
                    server: action.server,
                    key: action.key
                };
                break;
            case INTIIAL_LOAD_SUCCESS:
                draftState.initialLoad = 'success';
                break;
            case INITIAL_LOAD_FAIL:
                draftState.initialLoad = 'error';
                draftState.error = action.error;
                break;
            case STATION_LOAD_SUCCESS:
                draftState.stations[action.payload.data.name] = action.payload.data;
                draftState.initialLoad = 'success';
                break;
        }
    });

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

            let urlEncodedStationName = encodeURI(stationNames[i]);

            yield put({
                type: STATION_LOAD_START,
                payload: {
                    request: {
                        url: `/api/station/${urlEncodedStationName}/`
                    }
                }
            });
            
        }

    } catch (error) {

        // Let the app know about the error

        yield put({ type: INITIAL_LOAD_FAIL, error: error });

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
 * Handles a station load failure.
 */

function* stationLoadFail(action) {
    
    // Log the error to crashalytics

    crashlytics().recordError(action.error);

    // Determine if we're bombing out or not

    const currentState = yield select();
    if (currentState.stations.length == 0) {
        put({
            type: INITIAL_LOAD_FAIL
        });
    }

}

/**
 * Watches for every station loading failure.
 */

function* watchStationLoadFail() {
    yield takeEvery(STATION_LOAD_FAIL, stationLoadFail);
}

/**
 * The root saga that triggers all the others.
 */

export function* rootSaga() {
    yield all([
        watchInitialLoad(),
        watchStationLoadFail()
    ]);
}