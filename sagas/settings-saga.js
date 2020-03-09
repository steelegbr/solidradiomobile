import { all, takeEvery, put, take, takeLatest } from 'redux-saga/effects';
import { SET_DARK_MODE, STATION_LOAD_SUCCESS, setDarkMode } from '../reducers/actions';
import DefaultPreference from 'react-native-default-preference';

/**
 * Saves the change to the dark mode setting.
 * @param {action} action The action from changing the dark mode.
 */

function* saveDarkModeSetting(action) {
    const darkMode = action.mode ? "1": "0";
    yield DefaultPreference.set('darkMode', darkMode);
}

/**
 * Loads settings from the storage. Falls back to defaults.
 */

function* loadSettings() {

    // Nasty double coversion needed to convert "0" -> 0 -> false

    const darkMode = Boolean(Number(yield DefaultPreference.get('darkMode')));
    yield put(setDarkMode(darkMode));

}

export function* watchSettings() {
    yield all([
       takeEvery(SET_DARK_MODE, saveDarkModeSetting),
       takeLatest(STATION_LOAD_SUCCESS, loadSettings)
    ]);
}