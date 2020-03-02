/**
 * Solid Radio Sagas
 */

import { all } from 'redux-saga/effects';
import { watchInitialLoad } from './loading-saga';
import { watchStationLoadFail } from './station-load-fail-saga';

/**
 * The root saga that triggers all the others.
 */

export function* rootSaga() {
    yield all([
        watchInitialLoad(),
        watchStationLoadFail()
    ]);
}