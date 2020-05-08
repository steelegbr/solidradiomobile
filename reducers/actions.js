/**
 * Solid Radio Mobile App Reducers
 */

import produce from 'immer';
import { generateStationTheme, generateTheme } from '../branding/branding';
import { AdsConsentStatus } from '@react-native-firebase/admob';
import { PlayerState } from '../audio/player';

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
export const ONAIR_LOAD_START = 'ONAIR_LOAD';
export const ONAIR_LOAD_FAIL = 'ONAIR_LOAD_FAIL';
export const ONAIR_LOAD_SUCCESS = 'ONAIR_LOAD_SUCCESS';
export const SET_DARK_MODE = 'SET_DARK_MODE';
export const SET_HIGH_BITRATE = 'SET_HIGH_BITRATE';
export const SET_CURRENT_STATION = 'SET_CURRENT_STATION';
export const SET_STATION_NAME_LIST = 'SET_STATION_NAME_LIST';
export const LOAD_PLAYER_STATION = 'LOAD_PLAYER_STATION';
export const SET_ADMOB_PUBLISHER = 'SET_ADMOB_PUBLISHER';
export const SET_ADMOB_CONSENT = 'SET_ADMOB_CONSENT';
export const SET_ADMOB_PRIVACY_POLICY = 'SET_ADMOB_PRIVACY_POLICY';
export const SET_ADMOB_UNIT = 'SET_ADMOB_UNIT';
export const SET_PLAYER_STATE = 'SET_PLAYER_STATE';

defaultState = { 
    initialLoad: 'not_started',
    api : {
        server: null,
        key: null
    },
    stations: {},
    stationCount: 0,
    stationNames: [],
    currentStation: null,
    theme: generateTheme(false),
    vertical: true,
    tablet: false,
    backOffTime: 30,
    settings: {
        darkMode: false,
        highBitrate: false
    },
    player: {
        playlist: [],
        currentItem: 0,
        state: PlayerState.UNINITIALISED
    },
    admob: {
        publisher: null,
        consent: AdsConsentStatus.UNKNOWN,
        privacyPolicy: null,
        units: {}
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
                draftState.stations[stationName] = station;
                draftState.stations[stationName].nowPlaying = {
                    artist: null,
                    title: null,
                    artUrl: null
                };
                draftState.stations[stationName].onAir = {
                    show: null,
                    description: null,
                    image: null,
                    startTime: null
                }
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
            case ONAIR_LOAD_SUCCESS:
                const onAirStationName = getStationNameFromOnAir(action);
                draftState.stations[onAirStationName].onAir = {
                    show: action.payload.data.title,
                    description: action.payload.data.description,
                    image: action.payload.data.image,
                    startTime: action.payload.data.start
                }
                break;
            case SET_DARK_MODE:

                const darkMode = action.mode;
                draftState.settings.darkMode = darkMode;

                if (draftState.currentStation == undefined) {
                    draftState.theme = generateTheme(darkMode);
                } else {
                    draftState.theme = generateStationTheme(darkMode, draftState.stations[draftState.currentStation]);
                }

                break;

            case SET_HIGH_BITRATE:
                draftState.settings.highBitrate = action.mode;
                break;
            case SET_CURRENT_STATION:
                draftState.currentStation = action.station;
                draftState.theme = generateStationTheme(draftState.settings.darkMode, draftState.stations[action.station]);
                break;
            case SET_STATION_NAME_LIST:
                draftState.stationNames = action.stations;
                draftState.currentStation = draftState.stationNames[0];
                break;
            case SET_ADMOB_PUBLISHER:
                draftState.admob.publisher = action.publisherId;
                break;
            case SET_ADMOB_CONSENT:
                draftState.admob.consent = action.consent;
                break;
            case SET_ADMOB_PRIVACY_POLICY:
                draftState.admob.privacyPolicy = action.uri;
                break;
            case SET_ADMOB_UNIT:
                draftState.admob.units[action.name] = action.id;
                break;
            case LOAD_PLAYER_STATION:
                draftState.player.playlist = [{
                    type: 'station',
                    name: action.stationName
                }];
                draftState.player.currentItem = 0;
                break;
            case SET_PLAYER_STATE:
                draftState.player.state = action.state;
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
        stationName: name,
        payload: {
            request: {
                url: `/api/station/${urlEncodedStationName}/`
            }
        }
    };

}

/**
 * Loads the currently on air information for a station.
 * @param {string} name The name of station to get the on air information for.
 */

export function loadOnAir(name) {

    let urlEncodedStationName = encodeURI(name);

    return {
        type: ONAIR_LOAD_START,
        payload: {
            request: {
                url: `/api/epg/${urlEncodedStationName}/current/`
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

/**
 * Obtains the station name from the ON_AIR_SUCCESS or FAIL action.
 * @param {action} action The action updating the on air information.
 */

export function getStationNameFromOnAir(action) {

    // Pick out the station name

    const url = action.payload.config.url;
    const re = new RegExp('epg\/([^/]+)\/');
    const urlEncodedStationName = re.exec(url)[1];

    // Decode it for return

    return decodeURI(urlEncodedStationName);

}

/**
 * Sets dark mode.
 * @param {bool} mode TRUE or FALSE for dark mode.
 */

export function setDarkMode(mode) {
    return {
        type: SET_DARK_MODE,
        mode: mode
    };
}

/**
 * Sets whether we use high bitrate streaming.
 * @param {bool} mode TRUE or FALSE for high bitrate.
 */

export function setHighBitrate(mode) {
    return {
        type: SET_HIGH_BITRATE,
        mode: mode
    };
}

/**
 * Sets the current station.
 * @param {string} stationName The name of the station.
 */

export function setCurrentStation(stationName) {
    return {
        type: SET_CURRENT_STATION,
        station: stationName
    }
}

/**
 * Sets the branding colour for the app.
 * @param {hex string} colour The branding colour.
 */

export function setBrandingColour(colour) {
    return {
        type: SET_BRANDING_COLOUR,
        colour: colour
    };
}

/**
 * Sets the names of the stations in order.
 * @param {array of string} stations Station names.
 */

export function setStationNameList(stations) {
    return {
        type: SET_STATION_NAME_LIST,
        stations: stations
    };
}

/**
 * Loads a specified station into the player.
 * @param {string} stationName The name of the station.
 */

export function loadPlayerStation(stationName) {
    return {
        type: LOAD_PLAYER_STATION,
        stationName: stationName
    };
}

/**
 * Sets the AdMob publisher ID.
 * @param {string} publisherId The publisher ID for AdMob
 */

export function setAdMobPublisher(publisherId) {
    return {
        type: SET_ADMOB_PUBLISHER,
        publisherId: publisherId
    };
}

/**
 * Sets the AdMob consent status.
 * @param {int} consent The consent status.
 */

export function setAdMobConsent(consent) {
    return {
        type: SET_ADMOB_CONSENT,
        consent: consent
    };
}

/**
 * Sets the URI of the admob privacy policy.
 * @param {string} uri The privacy policy URI.
 */

export function setAdmobPrivacyPolicy(uri) {
    return {
        type: SET_ADMOB_PRIVACY_POLICY,
        uri: uri
    };
}

/**
 * Sets the ID of an admob unit of a given name.
 * @param {string} name The name of the unit.
 * @param {string} id The ID of the unit.
 */

export function setAdmobUnitId(name, id) {
    return {
        type: SET_ADMOB_UNIT,
        name: name,
        id: id
    };
}

/**
 * Sets the current state of the audio player.
 * @param {int} state The current state of the audio player.
 */

export function setPlayerState(state) {
    return {
        type: SET_PLAYER_STATE,
        state: state
    };
}