/**
 * Sagas for handling audio player events.
 */

import TrackPlayer from 'react-native-track-player';
import { setPlayerState, INITIAL_LOAD_REQUESTED, LOAD_PLAYER_STATION } from '../reducers/actions';
import { PlayerState } from '../audio/player';
import { put, all, call, select, takeEvery, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

const EVENT_PLAYER_STATE = 'EVENT_PLAYER_STATE';
const EVENT_PLAYER_ERROR = 'EVENT_PLAYER_ERROR';

/**
 * Handles initialisation of the player.
 */

function* playerInitSaga() {

    // Call the initial setup
    // We only do this once

    const state = yield select();

    if (state.player.state == PlayerState.UNINITIALISED) {

        // As per the documentation

        yield TrackPlayer.setupPlayer();
        yield put(setPlayerState(PlayerState.IDLE));

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
            }

        }

    }

}

/**
 * Handles an error from the player.
 * @param {error} error The error data.
 */

function* handleErrorEvent(error) {

    // Throw our application state

    yield put(setPlayerState(PlayerState.ERROR));

    // Handle the error

    console.log(error);

}

/**
 * Handles a state change event from the player.
 * @param {data} data The event data.
 */

function* handleStateEvent(data) {

    let translatedState;

    switch(data.state) {
        case TrackPlayer.STATE_NONE:
        case TrackPlayer.STATE_READY:
        case TrackPlayer.STATE_STOPPED:
            translatedState = PlayerState.IDLE;
            break;
        case TrackPlayer.STATE_PLAYING:
            translatedState = PlayerState.PLAYING;
            break;
        case TrackPlayer.STATE_PAUSED:
            translatedState = PlayerState.PAUSED;
            break;
        case TrackPlayer.STATE_BUFFERING:
        case TrackPlayer.STATE_CONNECTING:
            translatedState = PlayerState.LOADING;
            break;
    };

    yield put(setPlayerState(translatedState));

    console.log({
        data: data,
        translatedState: translatedState
    });

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

        // Unsubscribe (required)

        const unsubscribe = () => {};
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

    // Move into the loading state

    //yield put(setPlayerState(PlayerState.LOADING));

    // Load the station and play it

    const station = state.stations[action.stationName];
    const streamUrl = state.settings.highBitrate ? station.stream_aac_high : station.stream_aac_low;

    const stationTrack = {
        id: action.stationName,
        url: streamUrl,
        artist: getStreamArtist(action.stationName, station),
        title: getStreamTitle(station)
    };

    yield TrackPlayer.add([stationTrack]);
    yield TrackPlayer.play();

}

/**
 * Obtains the stream artist for a given station.
 * @param {string} stationName The name of the station.
 * @param {station} station The station we're instested in.
 */

function getStreamArtist(stationName, station) {
    return `${stationName} - ${station.onAir.show}`;
}

/**
 * Obtains the stream title for a fiven station.
 * @param {station} station The station we're instested in.
 */

function getStreamTitle(station) {
    return `${station.nowPlaying.artist} - ${station.nowPlaying.title}`;
}

export function* watchPlayer() {
    yield all([
        takeEvery(INITIAL_LOAD_REQUESTED, playerInitSaga),
        takeEvery(LOAD_PLAYER_STATION, loadPlayerStation)
    ]);
}