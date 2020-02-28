/**
 * Solid Radio Actions
 */

import remoteConfig from '@react-native-firebase/remote-config';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

export const INITIAL_LOAD_REQUESTED = 'solidradio/INITIAL_LOAD_REQUESTED';
export const INITIAL_LOAD_START = 'solidradio/INITIAL_LOAD_START';
export const INITIAL_LOAD_SUCCESS = 'solidradio/INITIAL_LOAD_SUCCESS';
export const INITIAL_LOAD_FAILED = 'solidradio/INITIAL_LOAD_FAILED';

defaultState = { 
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
                intialLoad: 'error',
                error: action.error
            };
        default:
            return state;
    }

}

export function startInitialLoad() {
    
}

/**
 * The intial load dispatching saga.
 */

export function* initialLoad() {
    yeild takeLatest(INITIAL_LOAD_REQUESTED, initialLoadSaga);
}

/**
 * The initial load worker saga.
 */

function* intialLoadSaga() {

    try {

        // Let everyone know we've started the process

        yeild put({ type: INITIAL_LOAD_START });

        // Request the settings

        yeild remoteConfig().setConfigSettings({
            isDeveloperModeEnabled: __DEV__
        });

        yeild remoteConfig().fetchAndActivate();
        const settings = yeild remoteConfig().get();

        // Extract the API settings

        if ('server' in settings && 'key' in settings) {
            const server = settings['server'];
            const key = settings['key'];
        } else {
            throw 'Missing API settings from remote configuration.';
        }

        // Run with the settings

        put(
            { 
                type: INITIAL_LOAD_SUCCESS,
                action: {
                    server: server,
                    key: key
                } 
            }
        )

    } catch (error) {

        // Let the app know about the error

        yeild put({ type: INITIAL_LOAD_FAILED, error });

        // Log it out to the analytics system (if we can)

    }


}