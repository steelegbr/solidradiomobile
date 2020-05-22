/**
 * Tests the reducer actions.
 */

import { INITIAL_LOAD_REQUESTED, initialLoad, reducer, INITIAL_LOAD_START, initialLoadStarted, setApiParams, INITIAL_LOAD_API, loadStation, STATION_LOAD_START, loadOnAir, ONAIR_LOAD_START, initialLoadFailure, INITIAL_LOAD_FAIL, nowPlayingSuccess, NOW_PLAYING_SUCCESS, nowPlayingFailure, NOW_PLAYING_FAIL, nowPlayingUpdate, NOW_PLAYING_UPDATE, changeOrientation, ORIENTATION_UPDATE, setTablet, TABLET_UPDATE, getStationNameFromOnAir, setDarkMode, SET_DARK_MODE, SET_HIGH_BITRATE, setHighBitrate, setCurrentStation, SET_CURRENT_STATION } from '../reducers/actions';
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

    it.each`
        server | key
        ${'example.com'} | ${'super-duper-key'}
        ${null} | ${null}
    `('api-params', ({ server, key }) => {

        // Arrange

        // Act
    
        const newState = reducer(state, setApiParams(server, key));
    
        // Assert

        expect(newState.api.server).toBe(server);
        expect(newState.api.key).toBe(key);
    
    });

    it.each`
        stationName
        ${'Test Station'}
        ${null}
        ${''}
    `('load-station-request', ({ stationName }) => {

        // Arrange
    
        // Act
    
        const newState = reducer(state, loadStation(stationName));
    
        // Assert
        // This is a no side-effects change
    
        expect(newState).toStrictEqual(state);
    
    });

    it.each`
        stationName
        ${'Test Station'}
        ${null}
        ${''}
    `('onair-load-request', ({ stationName }) => {
    
        // Act
    
        const newState = reducer(state, loadOnAir(stationName));
    
        // Assert
        // This is a no side-effects change
    
        expect(newState).toStrictEqual(state);
    
    });

    it.each`
        error
        ${'Some really bad error!'}
        ${null}
        ${''}
    `('initial-load-fail', (error) => {

        // Arrange
    
        // Act
    
        const newState = reducer(state, initialLoadFailure(error));
    
        // Assert

        expect(newState.initialLoad).toBe('error');
        expect(newState.error).toBe(error);
    
    });

    it.each`
        stationName
        ${'Test Station'}
        ${null}
        ${''}
    `('now-playing-success', ({ stationName }) => {

        // Arrange
    
        // Act
    
        const newState = reducer(state, nowPlayingSuccess(stationName));
    
        // Assert
        // This is a no side-effects change
    
        expect(newState).toStrictEqual(state);
    
    });

    it.each`
        stationName | error
        ${'Test Station'} | ${'Some really bad error'}
        ${null} | ${null}
        ${''} | ${''}
    `('now-playing-fail', ({ stationName, error }) => {

        // Arrange
    
        // Act
    
        const newState = reducer(state, nowPlayingFailure(stationName, error));
    
        // Assert
        // This is a no side-effects change
    
        expect(newState).toStrictEqual(state);
    
    });

    it.each`
        stationName | artist | title | artUrl
        ${'Test Station'} | ${'Test Artist'} | ${'Test Title'} | ${'art.png'}
        ${null} | ${null} | ${null} | ${null}
        ${''} | ${''} | ${''} | ${''}
    `('now-playing-update', ({ stationName, artist ,title, artUrl }) => {

        // Arrange

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

    it.each`
        stationName | artist | title | artUrl
        ${'Other Station'} | ${'Test Artist'} | ${'Test Title'} | ${'art.png'}
        ${null} | ${'Test Artist'} | ${'Test Title'} | ${'art.png'}
        ${''} | ${'Test Artist'} | ${'Test Title'} | ${'art.png'}
    `('now-playing-bad-station', ({ stationName, artist, title, artUrl }) => {

        // Arrange
    
        // Act
    
        const newState = reducer(state, nowPlayingUpdate(stationName, artist, title, artUrl));
    
        // Assert
        // This is a no side-effects change
    
        expect(newState).toStrictEqual(state);

    });

    it.each`
        vertical
        ${true}
        ${false}
    `('change-orientation', ({ vertical }) => {

        // Arrange
    
        // Act
    
        const newState = reducer(state, changeOrientation(vertical));
    
        // Assert

        expect(newState.vertical).toStrictEqual(vertical);
    
    });

    it.each`
        tablet
        ${true}
        ${false}
    `('is-tablet', ({ tablet }) => {

        // Arrange
    
        // Act
    
        const newState = reducer(state, setTablet(tablet));
    
        // Assert

        expect(newState.tablet).toStrictEqual(tablet);
    
    });

    it.each`
        darkMode
        ${true}
        ${false}
    `('set-dark-mode-no-station', ({ darkMode }) => {

        // Arrange
    
        // Act
    
        const newState = reducer(state, setDarkMode(darkMode));
    
        // Assert

        expect(newState.settings.darkMode).toBe(darkMode);
        expect(newState.theme.dark).toBe(darkMode)
    
    });

    it.each`
        stationName
        ${'Test Station'}
        ${'Another_Station!'}
        ${''}
    `('set-dark-mode-with-station', ({ stationName }) => {

        // Arrange

        const darkMode = true;
        const miniState = {
            currentStation: stationName,
            stations: {},
            settings: {}
        };

        miniState.stations[stationName] = {}
    
        // Act
    
        const newState = reducer(miniState, setDarkMode(darkMode));
    
        // Assert

        expect(newState.settings.darkMode).toBe(darkMode);
        expect(newState.theme.dark).toBe(darkMode)
    
    });

    it.each`
        highBitrate
        ${true}
        ${false}
    `('set-high-bitrate', ({ highBitrate }) => {

        // Arrange

        // Act

        const newState = reducer(state, setHighBitrate(highBitrate));

        // Assert

        expect(newState.settings.highBitrate).toBe(highBitrate);

    });

    it.each`
        stationName
        ${'Test Station'}
        ${'Another station with ! and @'}
        ${''}
        ${null}
    `('set-current-station-valid', ({ stationName }) => {

        // Arrange

        const miniState = {
            currentStation: null,
            stations: {},
            settings: {},
            stationNames: [ stationName ]
        };

        miniState.stations[stationName] = {
            primary_colour: '#ff0000'
        };

        // Act

        const newState = reducer(miniState, setCurrentStation(stationName));

        // Assert

        expect(newState.currentStation).toBe(stationName);

    });

    it.each`
        stationName
        ${'Test Station'}
        ${null}
        ${''}
    `('set-current-station-invalid', ({ stationName }) => {

        // Arrange

        // Act

        const newState = reducer(state, setCurrentStation(stationName));

        // Assert
        // This is a no side-effects change
    
        expect(newState).toStrictEqual(state);

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

    it.each`
        server | key
        ${'example.com'} | ${'super-duper-key'}
        ${null} | ${null}
    `('api-params', ({ server, key }) => {

        // Arrange
    
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

    it.each`
        stationName
        ${'Test Station'}
        ${null}
        ${''}
    `('load-station-request', ({ stationName }) => {

        // Arrange
    
        // Act
    
        const action = loadStation(stationName);
    
        // Assert

        const expected = {
            type: STATION_LOAD_START,
            stationName: stationName,
            payload: {
                request: {
                    url: `/api/station/${encodeURI(stationName)}/`
                }
            }
        };

        expect(action).toStrictEqual(expected);
    
    });

    it.each`
        stationName
        ${'Test Station'}
        ${null}
        ${''}
    `('onair-load-request', ({ stationName }) => {

        // Arrange
    
        // Act
    
        const action = loadOnAir(stationName);
    
        // Assert

        const expected = {
            type: ONAIR_LOAD_START,
            payload: {
                request: {
                    url: `/api/epg/${encodeURI(stationName)}/current/`
                }
            }
        };

        expect(action).toStrictEqual(expected);
    
    });

    it.each`
        error
        ${'Some really bad error!'}
        ${null}
        ${''}
    `('initial-load-fail', ({ error }) => {

        // Arrange
    
        // Act
    
        const action = initialLoadFailure(error);
    
        // Assert

        const expected = {
            type: INITIAL_LOAD_FAIL,
            error: error
        };

        expect(action).toStrictEqual(expected);
    
    });

    it.each`
        stationName
        ${'Test Station'}
        ${null}
        ${''}
    `('now-playing-success', ({ stationName }) => {

        // Arrange
    
        // Act
    
        const action = nowPlayingSuccess(stationName);
    
        // Assert

        const expected = {
            type: NOW_PLAYING_SUCCESS,
            station: stationName
        };

        expect(action).toStrictEqual(expected);
    
    });

    it.each`
        stationName | error
        ${'Test Station'} | ${'Some really bad error'}
        ${null} | ${null}
        ${''} | ${''}
    `('now-playing-fail', ({ stationName, error }) => {

        // Arrange
    
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

    it.each`
        stationName | artist | title | artUrl
        ${'Test Station'} | ${'Test Artist'} | ${'Test Title'} | ${'art.png'}
        ${null} | ${null} | ${null} | ${null}
        ${''} | ${''} | ${''} | ${''}
    `('now-playing-update', ({ stationName, artist ,title, artUrl }) => {

        // Arrange
    
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
        vertical
        ${true}
        ${false}
    `('change-orientation', ({ vertical }) => {

        // Arrange
    
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
    `('is-tablet', ({ tablet }) => {

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
    `('set-dark-mode', ({ darkMode }) => {

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

    it.each`
        highBitrate
        ${true}
        ${false}
    `('set-high-bitrate', ({ highBitrate }) => {

        // Arrange

        // Act
    
        const action = setHighBitrate(highBitrate);
    
        // Assert

        const expected = {
            type: SET_HIGH_BITRATE,
            mode: highBitrate
        };

        expect(action).toStrictEqual(expected);

    });

    it.each`
        stationName
        ${'Test Station'}
        ${null}
        ${''}
    `('set-current-station', ({ stationName }) => {

        // Arrange

        // Act

        const action = setCurrentStation(stationName);

        // Assert

        const expected = {
            type: SET_CURRENT_STATION,
            station: stationName
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