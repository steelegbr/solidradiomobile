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
 * Initial Application Loading Saga
 */

import remoteConfig from '@react-native-firebase/remote-config';
import { put, takeLatest, all, takeEvery, select } from 'redux-saga/effects';
import crashlytics from '@react-native-firebase/crashlytics';
import { initialLoadStarted, setApiParams, loadStation, initialLoadFailure, setStationNameList, INITIAL_LOAD_REQUESTED, STATION_LOAD_FAIL, setAdMobPublisher, setAdmobPrivacyPolicy, setAdmobUnitId, setTimezone, enableLogstash } from '../reducers/actions';
import { Platform } from 'react-native';
import * as RNLocalize from 'react-native-localize';

/**
 * The initial load worker saga.
 */

function* initialLoadSaga() {

    try {

        // Let everyone know we've started the process

        yield put(initialLoadStarted());

        // Timezone

        yield put(setTimezone(RNLocalize.getTimeZone()));

        // Request the settings

        yield remoteConfig().setConfigSettings({
            isDeveloperModeEnabled: __DEV__
        });

        yield remoteConfig().fetchAndActivate();
        const settings = yield remoteConfig().getAll();

        // Check for logstash

        if ('logstash' in settings) {
            const logstash_settings = JSON.parse(settings['logstash'].value);
            console.log(`Logstash config enabled. Sending to ${logstash_settings.url}`);
            yield put(enableLogstash(logstash_settings));
        } else {
            console.log('No logstash config detected.');
        }

        // Extract the API settings

        if (!('server' in settings && 'key' in settings && 'stations' in settings)) {
            throw 'Missing API settings from remote configuration.';
        }

        const server = settings.server.value;
        const key = settings.key.value;
        const admobPublisherId = settings.admob_publisher_id.value;
        const admobPrivacyPolicy = settings.admob_privacy_policy.value;

        yield put(setApiParams(server, key));

        // Advertising

        yield put(setAdMobPublisher(admobPublisherId));
        yield put(setAdmobPrivacyPolicy(admobPrivacyPolicy));

        const admobUnitNames = JSON.parse(settings.admob_unit_ids.value);
        for (let i = 0; i < admobUnitNames.length; i++) {
            yield put(setAdmobUnitId(admobUnitNames[i], settings[`admob_unit_id_${admobUnitNames[i]}_${Platform.OS}`].value));
        }

        // Trigger the parallel station loads

        const stationNames = JSON.parse(settings.stations.value);
        yield put(setStationNameList(stationNames));

        for (let i = 0; i < stationNames.length; i++) {
            yield put(loadStation(stationNames[i]));
        }

    } catch (error) {

        // Let the app know about the error

        yield put(initialLoadFailure(error));

        // Log it out to the analytics system (if we can)

        crashlytics().recordError(error);

    }

}

/**
 * Handles the failure to load a station from the API.
 * @param {action} action The action from the failed API call.
 */

function* stationLoadFail(action) {

    // Log the error to crashalytics

    crashlytics().recordError(action.error);

    // Determine if we're bombing out or not

    const currentState = yield select();
    if (currentState.stationCount == 0) {
        yield put(initialLoadFailure(action.error));
    }

}

/**
 * The intial load dispatching saga.
 */

export function* watchInitialLoad() {
    yield all([
        yield takeLatest(INITIAL_LOAD_REQUESTED, initialLoadSaga),
        yield takeEvery(STATION_LOAD_FAIL, stationLoadFail)
    ]);
}