/**
 * Solid Radio Actions
 */

import remoteConfig from '@react-native-firebase/remote-config';

export const GET_API_SETTINGS = 'solidradio/api/SETTINGS';
export const GET_API_SETTINGS_SUCCESS = 'solidradio/api/SETTINGS_SUCCESS';
export const GET_API_SETTINGS_FAILED = 'solidradio/api/SETTINGS_FAILED';

defaultState = { 
    api : {
        server: null,
        key: null
    }
}

export function reducer(state=defaultState, action) {

    switch (action.type) {
        case GET_API_SETTINGS:
            return {
                 ...state, 
                 status: 'loading'
            };
        case GET_API_SETTINGS_SUCCESS:
            return { 
                ...state, 
                status: 'success',
                api: {
                    server: action.server,
                    key: action.key
                }
            };
        case GET_API_SETTINGS_FAILED:
            return {
                ...state,
                status: 'error',
                error: action.error
            };
        default:
            return state;
    }

}

function getApiSettings() {
    return {
        type: GET_API_SETTINGS
    };
};

function setApiSettings(server, key) {
    return {
        type: GET_API_SETTINGS_SUCCESS,
        server: server,
        key: key
    };
};

function failApiSettings(error) {
    return {
        type: GET_API_SETTINGS_FAILED,
        error: error
    };
};

/**
 * Async function that triggers the API settings request.
 */

export function requestApiSettings() {
    return function(dispatch) {

        // Let everyone know we've started the process

        dispatch(getApiSettings());

        // Request the settings

        return remoteConfig().setConfigSettings(
                {
                    isDeveloperModeEnabled: __DEV__
                }
            )
            .then(
                response => {
                    return remoteConfig().fetchAndActivate();
                },
                error => {
                    dispatch(failApiSettings(error));
                }
            )
            .then(
                response => {
                    //if (response) {
                        return remoteConfig().getAll();
                    //} else {
                    //    throw `Failed to get the API settings. Reason: ${remoteConfig().lastFetchTime}`;
                   // }
                },
                error => {
                    dispatch(failApiSettings(error));
                }
            )
            .then(
                settings => {
                    
                    if ('server' in settings && 'key' in settings) {
                        dispatch(setApiSettings(settings['server'], settings['key']))
                    } else {
                        dispatch(failApiSettings('Missing API settings from remote configuration.'));
                    }

                },
                error => {
                    dispatch(failApiSettings(error));
                }
            );

    }
}