/**
 * Tests the reducer actions.
 */

import { INITIAL_LOAD_REQUESTED, initialLoad, reducer, INITIAL_LOAD_START, initialLoadStarted, setApiParams, INITIAL_LOAD_API, loadStation, STATION_LOAD_START, loadOnAir, ONAIR_LOAD_START, initialLoadFailure, INITIAL_LOAD_FAIL, nowPlayingSuccess, NOW_PLAYING_SUCCESS, nowPlayingFailure, NOW_PLAYING_FAIL, nowPlayingUpdate, NOW_PLAYING_UPDATE, changeOrientation, ORIENTATION_UPDATE, setTablet, TABLET_UPDATE, getStationNameFromOnAir, setDarkMode, SET_DARK_MODE, SET_HIGH_BITRATE, setHighBitrate, setCurrentStation, SET_CURRENT_STATION, setStationNameList, SET_STATION_NAME_LIST, loadPlayerStation, LOAD_PLAYER_STATION, SET_ADMOB_PUBLISHER, setAdMobPublisher, setAdMobConsent, SET_ADMOB_CONSENT, SET_ADMOB_PRIVACY_POLICY, setAdmobPrivacyPolicy, SET_ADMOB_UNIT, setAdmobUnitId, SET_PLAYER_STATE, setPlayerState, LOG_STREAM_START, logStreamStart, LOG_STREAM_END, logStreamEnd, LOG_STATION_SONG_PLAY, logStreamSongPlay } from '../reducers/actions';
import { PlayerState } from '../audio/player';
import { generateTheme } from '../branding/branding';
import { Title } from 'react-native-paper';

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

    it.each`
        list | listLength
        ${[]} |${0}
        ${['Test Station']} | ${1}
        ${['Test Station 1', 'Test Station 2']} | ${2}
    `('set-station-name-list', ({ list, listLength }) => {

        // Arrange

        // Act

        const newState = reducer(state, setStationNameList(list));

        // Assert
        // This is a no side-effects change
    
        expect(newState.stationNames).toStrictEqual(list);
        expect(newState.stationNames).toHaveLength(listLength);

        if (listLength > 0) {
            expect(newState.currentStation).toBe(list[0]);
        }

    });

    it.each`
        stationName
        ${'Test Station'}
        ${'Station Name with f@nny characters!'}
    `('load-player-station-valid', ({ stationName }) => {

        // Arrange

        const expectedPlaylist = [
            {
                type: 'station',
                name: stationName
            }
        ];

        // Act

        const newState = reducer(state, loadPlayerStation(stationName));

        // Assert

        expect(newState.player.playlist).toStrictEqual(expectedPlaylist);
        expect(newState.player.currentItem).toBe(0);

    });

    it.each`
        stationName
        ${''}
        ${null}
    `('load-player-station-invalid', ({ stationName }) => {

        // Arrange

        // Act

        const newState = reducer(state, loadPlayerStation(stationName));

        // Assert
        // This is a no side-effects change
    
        expect(newState).toStrictEqual(state);

    });

    it.each`
        publisherId
        ${'SUPER-LONG-PUBLISHER-1234'}
        ${null}
        ${''}
    `('set-admob-publisher', ({ publisherId }) => {

        // Arrange

        // Act

        const newState = reducer(state, setAdMobPublisher(publisherId));

        // Assert
    
        expect(newState.admob.publisher).toBe(publisherId);

    });

    it.each`
        consent
        ${0}
        ${1}
        ${2}
    `('set-admob-consent', ({ consent }) => {

        // Arrange

        // Act

        const newState = reducer(state, setAdMobConsent(consent));

        // Assert
    
        expect(newState.admob.consent).toBe(consent);

    });

    it.each`
        uri
        ${'https://www.example.com/'}
        ${null}
        ${''}
    `('set-admob-privacy', ({ uri }) => {

        // Arrange

        // Act

        const newState = reducer(state, setAdmobPrivacyPolicy(uri));

        // Assert
    
        expect(newState.admob.privacyPolicy).toBe(uri);

    });

    it.each`
        units
        ${[ {name: 'name1', id: 'id1'} ]}
        ${[ {name: 'name1', id: 'id1'}, {name: 'name2', id: 'id2'} ]}
    `('set-admob-unit-id', ({ units }) => {

        // Arrange

        // Act

        let newState = state;

        units.forEach(unit => {
            newState = reducer(newState, setAdmobUnitId(unit.name, unit.id));
        });

        // Assert

        units.forEach(unit => {
            expect(newState.admob.units[unit.name]).toBe(unit.id)
        });

    });

    it.each`
        playerState
        ${PlayerState.UNINITIALISED}
        ${PlayerState.IDLE}
        ${PlayerState.LOADING}
        ${PlayerState.PLAYING}
        ${PlayerState.PAUSED}
        ${PlayerState.ERROR}
    `('set-player-state', ({ playerState }) => {

        // Arrange

        // Act

        const newState = reducer(state, setPlayerState(playerState, null));

        // Assert
    
        expect(newState.player.state).toBe(playerState);

    });

    it.each`
        station | highBitrate
        ${'Foo FM'} | ${true}
        ${'Bar AM'} | ${false}
    `('log-stream-start', ({ station, highBitrate }) => {

        // Arrange

        // Act

        const newState = reducer(state, logStreamStart(station, highBitrate));

        // Assert
        // This is a no side-effects change
    
        expect(newState).toStrictEqual(state);

    });

    it.each`
        station | isError | error | aritst | title
        ${'Foo FM'} | ${true} | ${null} | ${null} | ${null}
        ${'Bar AM'} | ${false} | ${'Something went wrong...'} | ${null} | ${null}
        ${'Foo FM'} | ${true} | ${null} | ${'Artist'} | ${'Title'}
        ${'Bar AM'} | ${false} | ${'Something went wrong...'} | ${'Artist'} | ${'Title'}
    `('log-stream-end', ({ station, isError, error, artist, title }) => {

        // Arrange

        // Act

        const newState = reducer(state, logStreamEnd(station, isError, error, artist, title));

        // Assert
        // This is a no side-effects change
    
        expect(newState).toStrictEqual(state);

    });

    it.each`
        station |  aritst | title
        ${'Foo FM'} | ${null} | ${null}
        ${'Bar AM'} |  ${'Artist'} | ${'Title'}
    `('log-stream-songplay', ({ station, artist, title }) => {

        // Arrange

        // Act

        const newState = reducer(state, logStreamSongPlay(station, artist, title));

        // Assert
        // This is a no side-effects change
    
        expect(newState).toStrictEqual(state);

    });

});

// Tests the pure action calls

describe('actions', () => {

    it('initial-load', () => {

        // Arrange

        const expected = {
            type: INITIAL_LOAD_REQUESTED
        }
    
        // Act
    
        const action = initialLoad();
    
        // Assert
    
        expect(action).toStrictEqual(expected);
    
    });

    it('initial-load-started', () => {

        // Arrange

        const expected = {
            type: INITIAL_LOAD_START
        }
    
        // Act
    
        const action = initialLoadStarted();
    
        // Assert
    
        expect(action).toStrictEqual(expected);
    
    });

    it.each`
        server | key
        ${'example.com'} | ${'super-duper-key'}
        ${null} | ${null}
    `('api-params', ({ server, key }) => {

        // Arrange

        const expected = {
            type: INITIAL_LOAD_API,
            server: server,
            key: key
        };
    
        // Act
    
        const action = setApiParams(server, key);
    
        // Assert

        expect(action).toStrictEqual(expected);
    
    });

    it.each`
        stationName
        ${'Test Station'}
        ${null}
        ${''}
    `('load-station-request', ({ stationName }) => {

        // Arrange

        const expected = {
            type: STATION_LOAD_START,
            stationName: stationName,
            payload: {
                request: {
                    url: `/api/station/${encodeURI(stationName)}/`
                }
            }
        };
    
        // Act
    
        const action = loadStation(stationName);
    
        // Assert

        expect(action).toStrictEqual(expected);
    
    });

    it.each`
        stationName
        ${'Test Station'}
        ${null}
        ${''}
    `('onair-load-request', ({ stationName }) => {

        // Arrange

        const expected = {
            type: ONAIR_LOAD_START,
            payload: {
                request: {
                    url: `/api/epg/${encodeURI(stationName)}/current/`
                }
            }
        };
    
        // Act
    
        const action = loadOnAir(stationName);
    
        // Assert

        expect(action).toStrictEqual(expected);
    
    });

    it.each`
        error
        ${'Some really bad error!'}
        ${null}
        ${''}
    `('initial-load-fail', ({ error }) => {

        // Arrange

        const expected = {
            type: INITIAL_LOAD_FAIL,
            error: error
        };
    
        // Act
    
        const action = initialLoadFailure(error);
    
        // Assert

        expect(action).toStrictEqual(expected);
    
    });

    it.each`
        stationName
        ${'Test Station'}
        ${null}
        ${''}
    `('now-playing-success', ({ stationName }) => {

        // Arrange

        const expected = {
            type: NOW_PLAYING_SUCCESS,
            station: stationName
        };
    
        // Act
    
        const action = nowPlayingSuccess(stationName);
    
        // Assert

        expect(action).toStrictEqual(expected);
    
    });

    it.each`
        stationName | error
        ${'Test Station'} | ${'Some really bad error'}
        ${null} | ${null}
        ${''} | ${''}
    `('now-playing-fail', ({ stationName, error }) => {

        // Arrange

        const expected = {
            type: NOW_PLAYING_FAIL,
            station: stationName,
            error: error
        };
    
        // Act
    
        const action = nowPlayingFailure(stationName, error);
    
        // Assert

        expect(action).toStrictEqual(expected);
    
    });

    it.each`
        stationName | artist | title | artUrl
        ${'Test Station'} | ${'Test Artist'} | ${'Test Title'} | ${'art.png'}
        ${null} | ${null} | ${null} | ${null}
        ${''} | ${''} | ${''} | ${''}
    `('now-playing-update', ({ stationName, artist ,title, artUrl }) => {

        // Arrange

        const expected = {
            type: NOW_PLAYING_UPDATE,
            stationName: stationName,
            artist: artist,
            title: title,
            artUrl: artUrl
        };
    
        // Act
    
        const action = nowPlayingUpdate(stationName, artist, title, artUrl);
    
        // Assert

        expect(action).toStrictEqual(expected);
    
    });

    it.each`
        vertical
        ${true}
        ${false}
    `('change-orientation', ({ vertical }) => {

        // Arrange

        const expected = {
            type: ORIENTATION_UPDATE,
            vertical: vertical
        };
    
        // Act
    
        const action = changeOrientation(vertical);
    
        // Assert

        expect(action).toStrictEqual(expected);

    });

    it.each`
        tablet
        ${true}
        ${false}
    `('is-tablet', ({ tablet }) => {

        // Arrange

        const expected = {
            type: TABLET_UPDATE,
            tablet: tablet
        };
    
        // Act
    
        const action = setTablet(tablet);
    
        // Assert

        expect(action).toStrictEqual(expected);

    });

    it.each`
        darkMode
        ${true}
        ${false}
    `('set-dark-mode', ({ darkMode }) => {

        // Arrange

        const expected = {
            type: SET_DARK_MODE,
            mode: darkMode
        };

        // Act
    
        const action = setDarkMode(darkMode);
    
        // Assert

        expect(action).toStrictEqual(expected);

    });

    it.each`
        highBitrate
        ${true}
        ${false}
    `('set-high-bitrate', ({ highBitrate }) => {

        // Arrange

        const expected = {
            type: SET_HIGH_BITRATE,
            mode: highBitrate
        };

        // Act
    
        const action = setHighBitrate(highBitrate);
    
        // Assert

        expect(action).toStrictEqual(expected);

    });

    it.each`
        stationName
        ${'Test Station'}
        ${null}
        ${''}
    `('set-current-station', ({ stationName }) => {

        // Arrange

        const expected = {
            type: SET_CURRENT_STATION,
            station: stationName
        };

        // Act

        const action = setCurrentStation(stationName);

        // Assert

        expect(action).toStrictEqual(expected);

    });

    it.each`
        list | listLength
        ${[]} |${0}
        ${['Test Station']} | ${1}
        ${['Test Station 1', 'Test Station 2']} | ${2}
    `('set-station-name-list', ({ list, listLength }) => {

        // Arrange

        const expected = {
            type: SET_STATION_NAME_LIST,
            stations: list
        };

        // Act

        const action = setStationNameList(list);

        // Assert

        expect(action).toStrictEqual(expected);
        expect(action.stations).toHaveLength(listLength);

    });

    it.each`
        stationName
        ${'Test Station'}
        ${null}
        ${''}
    `('load-player-station', ({ stationName }) => {

        // Arrange

        const expected = {
            type: LOAD_PLAYER_STATION,
            stationName: stationName
        };

        // Act

        const action = loadPlayerStation(stationName);

        // Assert

        expect(action).toStrictEqual(expected);

    });

    it.each`
        publisherId
        ${'SUPER-LONG-PUBLISHER-1234'}
        ${null}
        ${''}
    `('set-admob-publisher', ({ publisherId }) => {

        // Arrange

        const expected = {
            type: SET_ADMOB_PUBLISHER,
            publisherId: publisherId
        };

        // Act

        const action = setAdMobPublisher(publisherId);

        // Assert

        expect(action).toStrictEqual(expected);

    });

    it.each`
        consent
        ${0}
        ${1}
        ${2}
    `('set-admob-consent', ({ consent }) => {

        // Arrange

        const expected = {
            type: SET_ADMOB_CONSENT,
            consent: consent
        };

        // Act

        const action = setAdMobConsent(consent);

        // Assert

        expect(action).toStrictEqual(expected);

    });

    it.each`
        uri
        ${'https://www.example.com/'}
        ${null}
        ${''}
    `('set-admob-privacy', ({ uri }) => {

        // Arrange

        const expected = {
            type: SET_ADMOB_PRIVACY_POLICY,
            uri: uri
        };

        // Act

        const action = setAdmobPrivacyPolicy(uri);

        // Assert

        expect(action).toStrictEqual(expected);

    });

    it.each`
        name | id
        ${'name'} | ${'id'}
        ${null} | ${null}
        ${''} | ${''}
    `('set-admob-unit-id', ({ name, id }) => {

        // Arrange

        const expected = {
            type: SET_ADMOB_UNIT,
            name: name,
            id: id
        };

        // Act

        const action = setAdmobUnitId(name, id);

        // Assert

        expect(action).toStrictEqual(expected);

    });

    it.each`
        state
        ${PlayerState.UNINITIALISED}
        ${PlayerState.IDLE}
        ${PlayerState.LOADING}
        ${PlayerState.PLAYING}
        ${PlayerState.PAUSED}
        ${PlayerState.ERROR}
    `('set-player-state', ({ state }) => {

        // Arrange

        const expected = {
            type: SET_PLAYER_STATE,
            state: state,
            unmappedState: null
        };

        // Act

        const action = setPlayerState(state, null);

        // Assert

        expect(action).toStrictEqual(expected);

    });

    it.each`
        station | highBitrate
        ${'Foo FM'} | ${true}
        ${'Bar AM'} | ${false}
    `('log-stream-start', ({ station, highBitrate }) => {

        // Arrange

        const expected = {
            type: LOG_STREAM_START,
            station: station,
            highBitrate: highBitrate
        };

        // Act

        const action = logStreamStart(station, highBitrate);

        // Assert

        expect(action).toStrictEqual(expected);

    });

    it.each`
        station | isError | error | aritst | title
        ${'Foo FM'} | ${true} | ${null} | ${null} | ${null}
        ${'Bar AM'} | ${false} | ${'Something went wrong...'} | ${null} | ${null}
        ${'Foo FM'} | ${true} | ${null} | ${'Artist'} | ${'Title'}
        ${'Bar AM'} | ${false} | ${'Something went wrong...'} | ${'Artist'} | ${'Title'}
    `('log-stream-end', ({ station, isError, error, artist, title }) => {

        // Arrange

        const expected = {
            type: LOG_STREAM_END,
            station: station,
            isError: isError,
            error: error,
            artist: artist,
            title: title
        };

        // Act

        const action = logStreamEnd(station, isError, error, artist, title);

        // Assert

        expect(action).toStrictEqual(expected);

    });

    it.each`
        station |  aritst | title
        ${'Foo FM'} | ${null} | ${null}
        ${'Bar AM'} |  ${'Artist'} | ${'Title'}
    `('log-stream-songplay', ({ station, artist, title }) => {

        // Arrange

        const expected = {
            type: LOG_STATION_SONG_PLAY,
            station: station,
            artist: artist,
            title: title
        };

        // Act

        const action = logStreamSongPlay(station, artist, title);

        // Assert

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