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