/**
 * Solid Radio Mobile App Reducers
 */

import produce from 'immer';
import { DefaultTheme } from 'react-native-paper';

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
    stationCount: 0,
    currentStation: null,
    theme: {
        ...DefaultTheme,
        roundness: 10,
        colors: {
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
                const station = action.payload.data;
                const stationName = station.name;
                draftState.stations[station.name] = station;
                draftState.stations[station.name].nowPlaying = {
                    artist: "",
                    title: "",
                    artUrl: ""
                };
                draftState.stationCount = baseState.stationCount + 1;
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
 * Informs everyone the initial load has started.
 */

export function initialLoadStarted() {
    return { 
        type: INITIAL_LOAD_START 
    };
}

/**
 * Sets the API parameters.
 * @param {string} server 
 * @param {string} key 
 */

export function setApiParams(server, key) {
    return {
        type: INITIAL_LOAD_API,
        server: server,
        key: key
    };
}

/**
 * Loads a station from the API.
 * @param {string} name 
 */

export function loadStation(name) {

    let urlEncodedStationName = encodeURI(name);

    return {
        type: STATION_LOAD_START,
        payload: {
            request: {
                url: `/api/station/${urlEncodedStationName}/`
            }
        }
    };

}

/**
 * Handles the failure to perform the initial application load.
 * @param {error} error 
 */

export function initialLoadFailure(error) {
    return {
        type: INITIAL_LOAD_FAIL,
        error: error
    };
}