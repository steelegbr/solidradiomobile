import { all, takeEvery, put, take, takeLatest } from 'redux-saga/effects';
import { SET_DARK_MODE, STATION_LOAD_SUCCESS, setDarkMode, setHighBitrate, SET_HIGH_BITRATE } from '../reducers/actions';
import DefaultPreference from 'react-native-default-preference';

/**
 * Saves the change to the dark mode setting.
 * @param {action} action The action from changing the dark mode.
 */

function* saveDarkModeSetting(action) {
    const darkMode = boolToString(action.mode);
    yield DefaultPreference.set('darkMode', darkMode);
}

/**
 * Saves the change to the high bitrate setting.
 * @param {action} action The action from changing the setting.
 */

function* saveHighBitrateSetting(action) {
    const highBitrate = boolToString(action.mode);
    yield DefaultPreference.set('highBitrate', highBitrate);
}

/**
 * Converts a boolean value to a string for saving.
 * @param {bool} bool The boolean value.
 */

function boolToString(bool) {
    return bool ? "1" : "0";
}

/**
 * Converts a string value from the store to a boolean.
 * @param {string} string The string value.
 */

function stringToBool(string) {
    return Boolean(Number(string));
}

/**
 * Loads settings from the storage. Falls back to defaults.
 */

function* loadSettings() {

    const darkMode = stringToBool(yield DefaultPreference.get('darkMode'));
    const highBitrate = stringToBool(yield DefaultPreference.get('highBitrate'));
    yield put(setDarkMode(darkMode));
    yield put(setHighBitrate(highBitrate));

}

export function* watchSettings() {
    yield all([
       takeEvery(SET_DARK_MODE, saveDarkModeSetting),
       takeEvery(SET_HIGH_BITRATE, saveHighBitrateSetting),
       takeLatest(STATION_LOAD_SUCCESS, loadSettings)
    ]);
}