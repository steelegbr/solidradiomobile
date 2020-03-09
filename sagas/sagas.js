/**
 * Solid Radio Sagas
 */

import { all } from 'redux-saga/effects';
import { watchInitialLoad } from './loading-saga';
import { watchNowPlaying } from './now-playing-saga';
import { orientationSaga } from './orientation-saga';
import { watchOnAir } from './on-air-saga';

/**
 * The root saga that triggers all the others.
 */

export function* rootSaga() {
    yield all([
        watchInitialLoad(),
        watchNowPlaying(),
        orientationSaga(),
        watchOnAir()
    ]);
}