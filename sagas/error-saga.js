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
 * Sagas for handling errors.
 */

import { ADMOB_LOAD_ERROR, AUDIO_PLAYER_ERROR } from '../reducers/actions';
import { all, takeEvery } from 'redux-saga/effects';
import crashlytics from '@react-native-firebase/crashlytics';

/**
 * Handles an audio player error.
 * @param {action} action The error action.
 */

function* handleAudioPlayerError(action) {

    // Convert the error to an error as needed

    let error = action.error;

    if (!(error instanceof Error)) {
        error = new Error(error);
    }

    yield crashlytics().recordError(error);

}

/**
 * Handles an ad load error.
 * @param {action} action The error action.
 */

function* handleAdLoadError(action) {
    yield crashlytics().recordError(action.error);
}

/**
 * Triggers for the error handling sagas.
 */

export function* handleErrors() {
    yield all([
        takeEvery(AUDIO_PLAYER_ERROR, handleAudioPlayerError),
        takeEvery(ADMOB_LOAD_ERROR, handleAdLoadError)
    ]);
}