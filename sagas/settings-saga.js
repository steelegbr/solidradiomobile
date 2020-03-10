import { all, takeEvery, put, takeLatest } from 'redux-saga/effects';
import { SET_DARK_MODE, STATION_LOAD_SUCCESS, setDarkMode, setHighBitrate, SET_HIGH_BITRATE } from '../reducers/actions';
import DefaultPreference from 'react-native-default-preference';

export const KEY_HIGH_BITRATE = 'highBitrate';
export const KEY_DARK_MODE = 'darkMode';

/**
 * Saves the change to the dark mode setting.
 * @param {action} action The action from changing the dark mode.
 */

function* saveDarkModeSetting(action) {
    const darkMode = boolToString(action.mode);
    yield DefaultPreference.set(KEY_DARK_MODE, darkMode);
}

/**
 * Saves the change to the high bitrate setting.
 * @param {action} action The action from changing the setting.
 */

function* saveHighBitrateSetting(action) {
    const highBitrate = boolToString(action.mode);
    yield DefaultPreference.set(KEY_HIGH_BITRATE, highBitrate);
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

    const darkMode = stringToBool(yield DefaultPreference.get(KEY_DARK_MODE));
    const highBitrate = stringToBool(yield DefaultPreference.get(KEY_HIGH_BITRATE));
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