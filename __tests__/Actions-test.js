/**
 * Tests the reducer actions.
 */

import { INITIAL_LOAD_REQUESTED, initialLoad, reducer, INITIAL_LOAD_START, initialLoadStarted, setApiParams, INITIAL_LOAD_API, loadStation, STATION_LOAD_START, loadOnAir, ONAIR_LOAD_START, initialLoadFailure, INITIAL_LOAD_FAIL, nowPlayingSuccess, NOW_PLAYING_SUCCESS, nowPlayingFailure, NOW_PLAYING_FAIL, nowPlayingUpdate, NOW_PLAYING_UPDATE, changeOrientation, ORIENTATION_UPDATE, setTablet, TABLET_UPDATE, getStationNameFromOnAir, setDarkMode, SET_DARK_MODE } from '../reducers/actions';
import { PlayerState } from '../audio/player';
import { generateTheme } from '../branding/branding';

// Tests

describe('reducer', () => {

    const state = { 
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
            consent: 0,
            privacyPolicy: null,
            units: {}
        }
    };

    it('initial-load', () => {

        // Arrange
    
        // Act
    
        const newState = reducer(state, initialLoad());
    
        // Assert
        // This is a no side-effects change
    
        expect(newState).toStrictEqual(state);
    
    });

    it('initial-load-started', () => {

        // Arrange
    
        // Act
    
        const newState = reducer(state, initialLoadStarted());
    
        // Assert

        expect(newState.initialLoad).toBe('started');
    
    });

    it('api-params', () => {

        // Arrange

        const server = 'server.example.com';
        const key = 'test-api-key';
    
        // Act
    
        const newState = reducer(state, setApiParams(server, key));
    
        // Assert

        expect(newState.api.server).toBe(server);
        expect(newState.api.key).toBe(key);
    
    });

    it('load-station-request', () => {

        // Arrange

        const stationName = 'Test Station';
    
        // Act
    
        const newState = reducer(state, loadStation(stationName));
    
        // Assert
        // This is a no side-effects change
    
        expect(newState).toStrictEqual(state);
    
    });

    it('onair-load-request', () => {

        // Arrange

        const stationName = 'Test Station';
    
        // Act
    
        const newState = reducer(state, loadOnAir(stationName));
    
        // Assert
        // This is a no side-effects change
    
        expect(newState).toStrictEqual(state);
    
    });

    it('initial-load-fail', () => {

        // Arrange

        const error = 'Some really bad error!';
    
        // Act
    
        const newState = reducer(state, initialLoadFailure(error));
    
        // Assert

        expect(newState.initialLoad).toBe('error');
        expect(newState.error).toBe(error);
    
    });

    it('now-playing-success', () => {

        // Arrange

        const stationName = 'Test Station';
    
        // Act
    
        const newState = reducer(state, nowPlayingSuccess(stationName));
    
        // Assert
        // This is a no side-effects change
    
        expect(newState).toStrictEqual(state);
    
    });

    it('now-playing-fail', () => {

        // Arrange

        const stationName = 'Test Station';
        const error = 'Some really bad error.';
    
        // Act
    
        const newState = reducer(state, nowPlayingFailure(stationName, error));
    
        // Assert
        // This is a no side-effects change
    
        expect(newState).toStrictEqual(state);
    
    });

    it('now-playing-update', () => {

        // Arrange

        const stationName = 'Test Station';
        const artist = 'Test Artist';
        const title = 'Test Title';
        const artUrl = 'art.png';

        let miniState = {
            stations: {}
        };

        miniState.stations[stationName] = {};
    
        // Act
    
        const newState = reducer(miniState, nowPlayingUpdate(stationName, artist, title, artUrl));
    
        // Assert

        const station = newState.stations[stationName];
        const nowPlaying = station.nowPlaying;

        expect(nowPlaying.artist).toBe(artist);
        expect(nowPlaying.title).toBe(title);
        expect(nowPlaying.artUrl).toBe(artUrl);
    
    });

    it('change-orientation', () => {

        // Arrange

        const vertical = true;
    
        // Act
    
        const newState = reducer(state, changeOrientation(vertical));
    
        // Assert

        expect(newState.vertical).toStrictEqual(vertical);
    
    });

    it('is-tablet', () => {

        // Arrange

        const tablet = true;
    
        // Act
    
        const newState = reducer(state, setTablet(tablet));
    
        // Assert

        expect(newState.tablet).toStrictEqual(tablet);
    
    });

    it('set-dark-mode-no-station', () => {

        // Arrange

        const darkMode = true;
    
        // Act
    
        const newState = reducer(state, setDarkMode(darkMode));
    
        // Assert

        expect(newState.settings.darkMode).toBe(darkMode);
        expect(newState.theme.dark).toBe(darkMode)
    
    });

    it('set-dark-mode-with-station', () => {

        // Arrange

        const darkMode = true;
        const miniState = {
            currentStation: 'Test Station',
            stations: {
                'Test Station': {

                }
            },
            settings: {}
        };
    
        // Act
    
        const newState = reducer(miniState, setDarkMode(darkMode));
    
        // Assert

        expect(newState.settings.darkMode).toBe(darkMode);
        expect(newState.theme.dark).toBe(darkMode)
    
    });

});

// Tests the pure action calls

describe('actions', () => {

    it('initial-load', () => {

        // Arrange
    
        // Act
    
        const action = initialLoad();
    
        // Assert
    
        const expected = {
            type: INITIAL_LOAD_REQUESTED
        }
    
        expect(action).toStrictEqual(expected);
    
    });

    it('initial-load-started', () => {

        // Arrange
    
        // Act
    
        const action = initialLoadStarted();
    
        // Assert
    
        const expected = {
            type: INITIAL_LOAD_START
        }
    
        expect(action).toStrictEqual(expected);
    
    });

    it('api-params', () => {

        // Arrange

        const server = 'server.example.com';
        const key = 'test-api-key';
    
        // Act
    
        const action = setApiParams(server, key);
    
        // Assert

        const expected = {
            type: INITIAL_LOAD_API,
            server: server,
            key: key
        };

        expect(action).toStrictEqual(expected);
    
    });

    it('load-station-request', () => {

        // Arrange

        const stationName = 'Test Station';
    
        // Act
    
        const action = loadStation(stationName);
    
        // Assert

        const expected = {
            type: STATION_LOAD_START,
            stationName: stationName,
            payload: {
                request: {
                    url: '/api/station/Test%20Station/'
                }
            }
        };

        expect(action).toStrictEqual(expected);
    
    });

    it('onair-load-request', () => {

        // Arrange

        const stationName = 'Test Station';
    
        // Act
    
        const action = loadOnAir(stationName);
    
        // Assert

        const expected = {
            type: ONAIR_LOAD_START,
            payload: {
                request: {
                    url: '/api/epg/Test%20Station/current/'
                }
            }
        };

        expect(action).toStrictEqual(expected);
    
    });

    it('initial-load-fail', () => {

        // Arrange

        const error = 'Some really bad error!';
    
        // Act
    
        const action = initialLoadFailure(error);
    
        // Assert

        const expected = {
            type: INITIAL_LOAD_FAIL,
            error: error
        };

        expect(action).toStrictEqual(expected);
    
    });

    it('now-playing-success', () => {

        // Arrange

        const stationName = 'Test Station';
    
        // Act
    
        const action = nowPlayingSuccess(stationName);
    
        // Assert

        const expected = {
            type: NOW_PLAYING_SUCCESS,
            station: stationName
        };

        expect(action).toStrictEqual(expected);
    
    });

    it('now-playing-fail', () => {

        // Arrange

        const stationName = 'Test Station';
        const error = 'Something went wrong!';
    
        // Act
    
        const action = nowPlayingFailure(stationName, error);
    
        // Assert

        const expected = {
            type: NOW_PLAYING_FAIL,
            station: stationName,
            error: error
        };

        expect(action).toStrictEqual(expected);
    
    });

    it('now-playing-update', () => {

        // Arrange

        const stationName = 'Test Station';
        const artist = 'Test Artist';
        const title = 'Test Title';
        const artUrl = 'art.png';
    
        // Act
    
        const action = nowPlayingUpdate(stationName, artist, title, artUrl);
    
        // Assert

        const expected = {
            type: NOW_PLAYING_UPDATE,
            stationName: stationName,
            artist: artist,
            title: title,
            artUrl: artUrl
        };

        expect(action).toStrictEqual(expected);
    
    });

    it.each`
        orientation
        ${true}
        ${false}
    `('change-orientation', (orientation) => {

        // Arrange

        const vertical = true;
    
        // Act
    
        const action = changeOrientation(vertical);
    
        // Assert

        const expected = {
            type: ORIENTATION_UPDATE,
            vertical: vertical
        };

        expect(action).toStrictEqual(expected);

    });

    it.each`
        tablet
        ${true}
        ${false}
    `('is-tablet', (tablet) => {

        // Arrange
    
        // Act
    
        const action = setTablet(tablet);
    
        // Assert

        const expected = {
            type: TABLET_UPDATE,
            tablet: tablet
        };

        expect(action).toStrictEqual(expected);

    });

    it.each`
        darkMode
        ${true}
        ${false}
    `('set-dark-mode-specific', (darkMode) => {

        // Arrange

        // Act
    
        const action = setDarkMode(darkMode);
    
        // Assert

        const expected = {
            type: SET_DARK_MODE,
            mode: darkMode
        };

        expect(action).toStrictEqual(expected);

        });

});

describe('helpers', () => {

    it('station-name-from-on-air', () => {

        // Arrange

        const action = {
            type: 'ON_AIR_SUCCESS',
            payload: {
                config: {
                    url: 'https://example.com/api/epg/Test%20Station/current/'
                }
            }
        }

        // Act

        const stationName = getStationNameFromOnAir(action);

        // Assert

        expect(stationName).toBe('Test Station');

    });

});