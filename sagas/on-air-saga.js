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
 * On Air Saga.
 */


import { put, all, takeEvery, call, select } from 'redux-saga/effects';
import { loadOnAir, getStationNameFromOnAir, STATION_LOAD_SUCCESS, ONAIR_LOAD_FAIL, ONAIR_LOAD_SUCCESS, NOW_PLAYING_UPDATE, updateOnAir } from '../reducers/actions';
import crashlytics from '@react-native-firebase/crashlytics';
import { DayTime, getEpgEntry } from '../epg/timezone';

/**
 * Triggers the currently on air information for a specific station.
 * @param {action} action The action triggering this call.
 */

function* getOnAirFromStationLoad(action) {

    const station = action.payload.data;
    const stationName = station.name;

    yield put(loadOnAir(stationName));

}

/**
 * Handles every on air information load failure.
 * @param {action} action The failed action.
 */

function* onAirLoadFailure(action) {

    // Log the initial error

    const stationName = getStationNameFromOnAir(action);
    crashlytics().log(`Failed to load the on air information for ${stationName}.`);
    crashlytics().recordError(action.error);

    // Sleep it off and try again

    const currentState = yield select();
    yield sleep(currentState.backOffTime);
    yield put(loadOnAir(stationName));

}

/**
 * Hadles every on air information load success.
 * @param {action} action The successful action.
 */

function* onAirLoadSuccess(action) {

    // Figure out the station

    const stationName = getStationNameFromOnAir(action);

    // Get the EPG and station timezone

    const state = yield select();
    const station_timezone = state.stations[stationName].timezone;
    const device_timezone = state.timezone;

    // Perform the lookup

    const epg = action.payload.data;
    const daytime = new DayTime(new Date(), device_timezone, station_timezone);
    const show = getEpgEntry(daytime, epg);

    // Update the schedule

    yield put(updateOnAir(stationName, show));

}

/**
 * Loads the current show from the EPG.
 * @param {action} action A now playing update to trigger.
 */

function* currentShowFromEpg(action) {

    // Get the EPG and station timezone

    const state = yield select();
    const station_timezone = state.stations[action.stationName].timezone;
    const device_timezone = state.timezone;

    // Perform the lookup
    // With sanity check

    const epg = state.stations[action.stationName].epg;
    if (epg == null) {
        return;
    }

    const daytime = new DayTime(new Date(), device_timezone, station_timezone);
    const show = getEpgEntry(daytime, epg)

    // Update the schedule

    yield put(updateOnAir(action.stationName, show));

}

export function* watchOnAir() {
    yield all([
        takeEvery(STATION_LOAD_SUCCESS, getOnAirFromStationLoad),
        takeEvery(ONAIR_LOAD_FAIL, onAirLoadFailure),
        takeEvery(ONAIR_LOAD_SUCCESS, onAirLoadSuccess),
        takeEvery(NOW_PLAYING_UPDATE, currentShowFromEpg)
    ]);
}