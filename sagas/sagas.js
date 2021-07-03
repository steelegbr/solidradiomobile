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
 * Solid Radio Sagas
 */

import { all } from 'redux-saga/effects';
import { watchInitialLoad } from './loading-saga';
import { watchNowPlaying } from './now-playing-saga';
import { orientationSaga } from './orientation-saga';
import { watchOnAir } from './on-air-saga';
import { watchSettings } from './settings-saga';
import { watchAnalytics } from './analytics-saga';
import { watchAdmob } from './admob-saga';
import { watchPlayer } from './player-saga';
import { handleErrors } from './error-saga';

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
        watchAnalytics(),
        watchAdmob(),
        watchPlayer(),
        handleErrors()
    ]);
}