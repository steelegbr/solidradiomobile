/**
 * Solid Radio Sagas
 */

import { all } from 'redux-saga/effects';
import { watchInitialLoad } from './loading-saga';
import { watchNowPlaying } from './now-playing-saga';
import { orientationSaga } from './orientation-saga';
import { watchOnAir } from './on-air-saga';
import { watchSettings } from './settings-saga';
import { watchAnalytics } from './analytics-saga';

/**
 * The root saga that triggers all the others.
 */

export function* rootSaga() {
    yield all([
        watchInitialLoad(),
        watchNowPlaying(),
        orientationSaga(),
        watchOnAir(),
        watchSettings(),
        watchAnalytics()
    ]);
}