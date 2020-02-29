/**
 * Solid Radio Sagas
 */

import remoteConfig from '@react-native-firebase/remote-config';
import { call, put, takeEvery, takeLatest, all, delay } from 'redux-saga/effects';

export const INITIAL_LOAD_REQUESTED = 'solidradio/INITIAL_LOAD_REQUESTED';
export const INITIAL_LOAD_START = 'solidradio/INITIAL_LOAD_START';
export const INITIAL_LOAD_SUCCESS = 'solidradio/INITIAL_LOAD_SUCCESS';
export const INITIAL_LOAD_FAILED = 'solidradio/INITIAL_LOAD_FAILED';

defaultState = { 
    initialLoad: 'not_started',
    api : {
        server: null,
        key: null
    }
}

export function reducer(state=defaultState, action) {

    switch (action.type) {
        case INITIAL_LOAD_START:
            return {
                 ...state, 
                 initialLoad: 'started'
            };
        case INITIAL_LOAD_SUCCESS:
            return { 
                ...state, 
                initialLoad: 'success',
                api: {
                    server: action.server,
                    key: action.key
                }
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

        if ('server' in settings && 'key' in settings) {

            const server = settings.server.value;
            const key = settings.key.value;

            //TODO: Move this down the logic chain!

            yield delay(5000);

            yield put(
                { 
                    type: INITIAL_LOAD_SUCCESS,
                    server: server,
                    key: key
                }
            );


        } else {
            throw 'Missing API settings from remote configuration.';
        }

        // Trigger the parallel station loads

    } catch (error) {

        // Let the app know about the error

        yield put({ type: INITIAL_LOAD_FAILED, error });

        // Log it out to the analytics system (if we can)

    }

}

/**
 * The intial load dispatching saga.
 */

function* watchInitialLoad() {
    yield takeLatest(INITIAL_LOAD_REQUESTED, initialLoadSaga);
}

/**
 * The root saga that triggers all the others.
 */

export function* rootSaga() {
    yield all([
        watchInitialLoad()
    ]);
}