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
export const NOW_PLAYING_SUCCESS = 'NOW_PLAYING_SUCCESS';
export const NOW_PLAYING_FAIL = 'NOW_PLAYING_FAIL';
export const NOW_PLAYING_UPDATE = 'NOW_PLAYING_UPDATE';
export const ORIENTATION_UPDATE = 'ORIENTATION_UPDATE';
export const TABLET_UPDATE = 'TABLET_UPDATE';

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
    },
    vertical: true,
    tablet: false
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
                draftState.stations[stationName] = station;
                draftState.stations[stationName].nowPlaying = {
                    artist: "",
                    title: "",
                    artUrl: ""
                };
                draftState.stationCount = baseState.stationCount + 1;
                draftState.initialLoad = 'success';
                break;
            case NOW_PLAYING_UPDATE:
                draftState.stations[action.stationName].nowPlaying = {
                    artist: action.artist,
                    title: action.title,
                    artUrl: action.artUrl
                }
                break;
            case ORIENTATION_UPDATE:
                draftState.vertical = action.vertical;
                break;
            case TABLET_UPDATE:
                draftState.tablet = action.tablet;
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
 * @param {string} server The API server.
 * @param {string} key The key we authenticate with.
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
 * @param {string} name The name of the station to load.
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
 * @param {error} error The error encountered.
 */

export function initialLoadFailure(error) {
    return {
        type: INITIAL_LOAD_FAIL,
        error: error
    };
}

/**
 * Indicates the now playing web socket was successfully connected.
 * @param {string} stationName The name of the station.
 */

export function nowPlayingSuccess(stationName) {
    return {
        type: NOW_PLAYING_SUCCESS,
        station: stationName
    };
}

/**
 * Indicates an error occurred with the now playing process.
 * @param {string} stationName The name of the station.
 * @param {error} error The error encountered.
 */

export function nowPlayingFailure(stationName, error) {
    return {
        type: NOW_PLAYING_FAIL,
        station: stationName,
        error: error
    };
}

/**
 * Updates the now playing for a specified station.
 * @param {string} stationName The name of the station the update is for.
 * @param {string} artist The current artist.
 * @param {string} title The current title.
 * @param {string} artUrl The current album art URL.
 */

export function nowPlayingUpdate(stationName, artist, title, artUrl) {
    return {
        type: NOW_PLAYING_UPDATE,
        stationName: stationName,
        artist: artist,
        title: title,
        artUrl: artUrl
    };
}

/**
 * Indicates a change in screen orientation.
 * @param {boolean} vertical Indicates if the screen is vertical.
 */

export function changeOrientation(vertical) {
    return {
        type: ORIENTATION_UPDATE,
        vertical: vertical
    };
}

/**
 * Sets a flag to indicate if the device is a tablet.
 * @param {boolean} isTablet Indicates if the device is a tablet or not.
 */

export function setTablet(isTablet) {
    return {
        type: TABLET_UPDATE,
        tablet: isTablet
    };
}