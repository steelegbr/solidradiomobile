/**
    Solid Radio Mobile App
    Copyright (C) 2020-2021 Marc Steele

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

/**
 * Sagas for handling audio player events.
 */

import TrackPlayer from 'react-native-track-player';
import { setPlayerState, INITIAL_LOAD_REQUESTED, LOAD_PLAYER_STATION, logStreamStart, logStreamSongPlay, NOW_PLAYING_UPDATE, AUDIO_PLAYER_PLAYPAUSE, togglePlayPause, audioPlayerPlay, audioPlayerPause, audioPlayerStop, AUDIO_PLAYER_PAUSE, AUDIO_PLAYER_PLAY, AUDIO_PLAYER_STOP, SET_PLAYER_STATE, setPlayerExpectedState, audioPlayerError } from '../reducers/actions';
import { PlayerState } from '../audio/player';
import { put, all, call, select, takeEvery, take, delay, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

const EVENT_PLAYER_STATE = 'EVENT_PLAYER_STATE';
const EVENT_PLAYER_ERROR = 'EVENT_PLAYER_ERROR';
const EVENT_PLAYER_PLAYPAUSE = 'EVENT_PLAYER_PLAYPAUSE';
const EVENT_PLAYER_STOP = 'EVENT_PLAYER_STOP';
const EVENT_PLAYER_PAUSE = 'EVENT_PLAYER_PAUSE';
const EVENT_PLAYER_PLAY = 'EVENT_PLAYER_PLAY';
const SOURCE = 'remote_control';

/**
 * Handles initialisation of the player.
 */

function* playerInitSaga() {

    // Call the initial setup
    // We only do this once

    const state = yield select();

    if (state.player.state == PlayerState.UNINITIALISED) {

        // As per the documentation

        yield TrackPlayer.setupPlayer({
            waitForBuffer: true
        });
        yield put(setPlayerState(PlayerState.IDLE, null));

        // Callbacks

        channel = yield call(createPlayerChannel);
        while (true) {

            let event = yield take(channel);

            switch (event.type) {
                case EVENT_PLAYER_STATE:
                    yield call(handleStateEvent, event.data);
                    break;
                case EVENT_PLAYER_ERROR:
                    yield call(handleErrorEvent, event.error);
                    break;
                case EVENT_PLAYER_PLAYPAUSE:
                    yield put(togglePlayPause(SOURCE))
                    break;
                case EVENT_PLAYER_PLAY:
                    yield put(audioPlayerPlay(SOURCE))
                    break;
                case EVENT_PLAYER_PAUSE:
                    yield put(audioPlayerPause(SOURCE));
                    break;
                case EVENT_PLAYER_STOP:
                    yield put(audioPlayerStop(SOURCE));
                    break;
            }

        }

    }

}

/**
 * Handles stopping the player.
 */

function* handleStop() {

    // Sanity check

    const state = yield select();

    if (state !== PlayerState.IDLE) {
        TrackPlayer.destroy();
        yield put(setPlayerState(PlayerState.IDLE, null));
    }

}

/**
 * Handles an error from the player.
 * @param {error} error The error data.
 */

function* handleErrorEvent(error) {

    // Throw our application state

    yield put(setPlayerState(PlayerState.ERROR, null));

    // Handle the error

    yield put(audioPlayerError(error));

}

/**
 * Handles a state change event from the player.
 * @param {data} data The event data.
 */

function* handleStateEvent(data) {

    let translatedState;

    switch (data.state) {
        case TrackPlayer.STATE_NONE:
        case TrackPlayer.STATE_STOPPED:
            translatedState = PlayerState.IDLE;
            break;
        case TrackPlayer.STATE_PLAYING:
            translatedState = PlayerState.PLAYING;
            break;
        case TrackPlayer.STATE_PAUSED:
        case TrackPlayer.STATE_READY:
            translatedState = PlayerState.PAUSED;
            break;
        case TrackPlayer.STATE_BUFFERING:
        case TrackPlayer.STATE_CONNECTING:
        case "buffering":
            translatedState = PlayerState.LOADING;
            break;
    };

    yield put(setPlayerState(translatedState, data.state));

}

/**
 * Creates our callback channel from the player.
 */

function createPlayerChannel() {
    return eventChannel(emit => {

        // Callbacks we want to hook up

        TrackPlayer.addEventListener('playback-state', (data) => {
            emit({
                type: EVENT_PLAYER_STATE,
                data: data
            });
        });

        TrackPlayer.addEventListener('playback-error', (error) => {
            emit({
                type: EVENT_PLAYER_ERROR,
                error: error
            });
        })

        TrackPlayer.addEventListener('remote-play', () => {
            emit({
                type: EVENT_PLAYER_PLAY
            });
        });

        TrackPlayer.addEventListener('remote-pause', () => {
            emit({
                type: EVENT_PLAYER_PAUSE
            });
        });

        TrackPlayer.addEventListener('remote-stop', () => {
            emit({
                type: EVENT_PLAYER_STOP
            });
        })

        // Unsubscribe (required)

        const unsubscribe = () => { };
        return unsubscribe;

    });
}

/**
 * Handles stations being loaded into the player.
 * @param {action} action The action that triggered us.
 */

function* loadPlayerStation(action) {

    const state = yield select();

    // Clear out anything currently playing

    if (state.player.state !== PlayerState.IDLE) {
        TrackPlayer.reset();
    }

    // Set the capabilities

    TrackPlayer.updateOptions({
        capabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE,
            TrackPlayer.CAPABILITY_STOP
        ]
    });

    // Load the station and play it

    const station = state.stations[action.stationName];
    const streamUrl = state.settings.highBitrate ? station.stream_aac_high : station.stream_aac_low;

    const stationTrack = {
        id: action.stationName,
        url: streamUrl,
        artist: getStreamArtist(station),
        title: getStreamTitle(station),
        artwork: getStreamArt(station),
        album: getStreamAlbum(action.stationName, station)
    };

    yield TrackPlayer.add([stationTrack]);
    yield TrackPlayer.play();

    // Log the start

    yield put(setPlayerExpectedState(PlayerState.PLAYING));
    yield put(logStreamStart(action.stationName, state.settings.highBitrate));
    yield put(logStreamSongPlay(action.stationName, stationTrack.artist, stationTrack.title));

}

/**
 * Handles now playing updates to see if we're stream and should update the metadata.
 * @param {action} action The now playing action.
 */

function* handleNowPlaying(action) {

    // Check if we're streaming

    const state = yield select();
    if (!isStreaming(state)) {
        return;
    }

    // And it's the right station

    const currentStationName = state.player.playlist[0].name;
    if (action.stationName !== currentStationName) {
        return;
    }

    // Update the metadata

    const station = state.stations[currentStationName];

    try {

        yield TrackPlayer.updateMetadataForTrack(currentStationName, {
            artist: getStreamArtist(station),
            title: getStreamTitle(station),
            artwork: getStreamArt(station),
            album: getStreamAlbum(action.stationName, station)
        });

    } catch (error) {
        console.log("Failed to update now playing as the track is not in the player!");
    }

    // Log to analytics

    yield put(logStreamSongPlay(currentStationName, action.artist, action.title));

}

/**
 * Handles player state changes
 * @param {action} action The player state change action.
 */

function* playerStateChange(action) {

    // Check what state we're in

    if (action.unmappedState == "ready") {

        // Initial load complete - trigger a play

        yield put(audioPlayerPlay("load_complete_trigger"));

    } else if (action.state == PlayerState.PAUSED || action.state == PlayerState.ERROR) {

        // Check if we triggerd a pause (or it was a failure)

        const initState = yield select();

        if (initState.player.expectedState == PlayerState.PLAYING && isStreaming(initState)) {

            // Sleep it off

            yield put(setPlayerState(PlayerState.LOADING));
            yield delay(3000);

            // Check the update state

            const newState = yield select();

            if (newState.player.state == PlayerState.LOADING) {
                yield call(loadPlayerStation, { stationName: newState.currentStation });
            }

        }

    }

}

/**
 * Indicates if the current audio is a stream or not.
 * @param {state} state The current application state.
 */

function isStreaming(state) {

    if (state.player.state == PlayerState.IDLE || state.player.state == PlayerState.UNINITIALISED) {
        return false;
    }

    if (state.player.playlist.length != 1 || state.player.playlist[0].type !== "station") {
        return false;
    }

    return true;

}

/**
 * Obtains the stream artist for a given station.
 * @param {string} stationName The name of the station.
 * @param {station} station The station we're instested in.
 */

function getStreamArtist(station) {
    return station.nowPlaying.artist;
}

/**
 * Obtains the stream title for a given station.
 * @param {station} station The station we're instested in.
 */

function getStreamTitle(station) {
    return station.nowPlaying.title;
}

/**
 * Obtains the stream album for a given station.
 * @param {station} station The station we're intested in.
 */

function getStreamAlbum(stationName, station) {
    return `${stationName} - ${station.onAir.show}`;
}

/**
 * Obtains the artwork for a given station.
 * @param {station} station The station we're interested in.
 */

function getStreamArt(station) {

    // Try for now playing

    const nowPlayingArt = station.nowPlaying.artUrl;
    if (nowPlayingArt) {
        return nowPlayingArt;
    }

    // Fall back to the current show

    const onAirArt = station.onAir.image;
    if (onAirArt) {
        return onAirArt;
    }

    // And finally, the station logo

    return station.logo_square;

}

/**
 * Handles the play/pause toggle request.
 */

function* handlePlayPause() {

    // Check the state and toggle

    const state = yield select();

    if (state.player.state == PlayerState.PLAYING) {
        yield put(setPlayerExpectedState(PlayerState.PAUSED));
        yield TrackPlayer.pause();
        yield put(setPlayerState(PlayerState.PAUSED, null));
    } else if (state.player.state == PlayerState.PAUSED) {
        yield put(setPlayerExpectedState(PlayerState.PLAYING));
        yield TrackPlayer.play();
        yield put(setPlayerState(PlayerState.PLAYING, null));
    }

}

/**
 * Handles a pause request.
 */

function* handlePause() {

    // Check the state and pause

    const state = yield select();
    if (state.player.state == PlayerState.PLAYING) {
        yield put(setPlayerExpectedState(PlayerState.PAUSED));
        yield TrackPlayer.pause();
        yield put(setPlayerState(PlayerState.PAUSED, null));
    }

}

/**
 * Handles a play request.
 */

function* handlePlay() {

    // Check the state and play

    const state = yield select();
    if (state.player.state == PlayerState.PAUSED) {
        yield put(setPlayerExpectedState(PlayerState.PLAYING));
        yield TrackPlayer.play();
        yield put(setPlayerState(PlayerState.PLAYING, null));
    }

}

export function* watchPlayer() {
    yield all([
        takeEvery(INITIAL_LOAD_REQUESTED, playerInitSaga),
        takeEvery(LOAD_PLAYER_STATION, loadPlayerStation),
        takeEvery(NOW_PLAYING_UPDATE, handleNowPlaying),
        takeEvery(AUDIO_PLAYER_PLAYPAUSE, handlePlayPause),
        takeEvery(AUDIO_PLAYER_PAUSE, handlePause),
        takeEvery(AUDIO_PLAYER_PLAY, handlePlay),
        takeEvery(AUDIO_PLAYER_STOP, handleStop),
        takeEvery(SET_PLAYER_STATE, playerStateChange)
    ]);
}