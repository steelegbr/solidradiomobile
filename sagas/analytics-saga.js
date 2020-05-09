/**
 * Provides analytics functions for the app.
 */

import { all, takeEvery, put, takeLatest } from 'redux-saga/effects';
import { SET_DARK_MODE, SET_HIGH_BITRATE, SET_CURRENT_STATION, LOG_STREAM_END, LOG_STREAM_START, LOG_STATION_SONG_PLAY } from '../reducers/actions';
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
 * Provides the analytics watchdog.
 */

export function* watchAnalytics() {
    yield all([
        takeEvery(SET_DARK_MODE, logDarkMode),
        takeEvery(SET_HIGH_BITRATE, logHighBitrate),
        takeEvery(SET_CURRENT_STATION, logStationChange),
        takeEvery(LOG_STREAM_START, logStreamStart),
        takeEvery(LOG_STREAM_END, logStreamEnd),
        takeEvery(LOG_STATION_SONG_PLAY, logStreamSongPlay)
    ]);
}