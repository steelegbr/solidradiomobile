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
 * Provides analytics functions for the app.
 */

import { all, takeEvery, put, takeLatest } from 'redux-saga/effects';
import { SET_DARK_MODE, SET_HIGH_BITRATE, SET_CURRENT_STATION, LOG_STREAM_END, LOG_STREAM_START, LOG_STATION_SONG_PLAY, AUDIO_PLAYER_PLAYPAUSE, AUDIO_PLAYER_PAUSE, AUDIO_PLAYER_PLAY, AUDIO_PLAYER_STOP } from '../reducers/actions';
import { KEY_DARK_MODE, KEY_HIGH_BITRATE } from './settings-saga';
import analytics from '@react-native-firebase/analytics';

/**
 * Logs a dark mode setting change.
 * @param {action} action The dark mode config action.
 */

function* logDarkMode(action) {
    const darkMode = action.mode;
    yield analytics().logEvent(KEY_DARK_MODE, {
        value: darkMode
    });
}

/**
 * Logs a high bitrate setting change.
 * @param {action} action The high bitrate config action.
 */

function* logHighBitrate(action) {
    const highBitrate = action.mode;
    yield analytics().logEvent(KEY_HIGH_BITRATE, {
        value: highBitrate
    });
}

/**
 * Logs a station selection change.
 * @param {action} action The station selection action.
 */

function* logStationChange(action) {
    yield analytics().logEvent('set_current_station', {
        station: action.station
    })
}

/**
 * Logs a stream starting.
 * @param {action} action The stream start event.
 */

function* logStreamStart(action) {
    yield analytics().logEvent('stream_start', action);
}

/**
 * Logs a stream ending.
 * @param {action} action The stream end event.
 */

function* logStreamEnd(action) {
    yield analytics().logEvent('stream_end', action);
}

/**
 * Logs every song we listen to on a stream.
 * @param {action} action The streaming song play event.
 */

function* logStreamSongPlay(action) {
    yield analytics().logEvent('stream_song_play', action);
}

/**
 * Logs a play/pause request for the audio player.
 * @param {action} action The action to trigger the player.
 */

function* logPlayPause(action) {
    yield analytics().logEvent('player', {
        action: 'play_pause',
        source: action.source
    });
}

/**
 * Logs a play request for the audio player.
 * @param {action} action The action to trigger the player.
 */

function* logPlay(action) {
    yield analytics().logEvent('player', {
        action: 'play',
        source: action.source
    });
}

/**
 * Logs a pause request for the audio player.
 * @param {action} action The action to trigger the player.
 */

function* logPause(action) {
    yield analytics().logEvent('player', {
        action: 'pause',
        source: action.source
    });
}

/**
 * Logs a stop request for the audio player.
 * @param {action} action The action to trigger the player.
 */

function* logStop(action) {
    yield analytics().logEvent('player', {
        action: 'stop',
        source: action.source
    });
}

/**
 * Provides the analytics watchdog.
 */

export function* watchAnalytics() {
    yield all([
        takeEvery(SET_DARK_MODE, logDarkMode),
        takeEvery(SET_HIGH_BITRATE, logHighBitrate),
        takeEvery(SET_CURRENT_STATION, logStationChange),
        takeEvery(LOG_STREAM_START, logStreamStart),
        takeEvery(LOG_STREAM_END, logStreamEnd),
        takeEvery(LOG_STATION_SONG_PLAY, logStreamSongPlay),
        takeEvery(AUDIO_PLAYER_PLAYPAUSE, logPlayPause),
        takeEvery(AUDIO_PLAYER_PAUSE, logPause),
        takeEvery(AUDIO_PLAYER_PLAY, logPlay),
        takeEvery(AUDIO_PLAYER_STOP, logStop)
    ]);
}