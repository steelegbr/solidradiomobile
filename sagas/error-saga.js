/**
 * Sagas for handling errors.
 */

import { ADMOB_LOAD_ERROR, AUDIO_PLAYER_ERROR } from '../reducers/actions';
import { all, takeEvery } from 'redux-saga/effects';
import crashlytics from '@react-native-firebase/analytics';

/**
 * Handles an audio player error.
 * @param {action} action The error action.
 */

function* handleAudioPlayerError(action) {
    yield crashlytics().recordError(action.error);
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