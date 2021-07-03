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
 * Saga for handling admob configuration.
 */

import admob, { MaxAdContentRating, AdsConsent, AdsConsentStatus, AdsConsentDebugGeography } from "@react-native-firebase/admob";
import { takeLatest, select, all, put } from "redux-saga/effects";
import { setAdMobConsent, SET_ADMOB_PRIVACY_POLICY, initialLoadFailure } from '../reducers/actions';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';

/**
 * Saga for firing up admob.
 */

function* adMobSaga() {

    try {

        // Test non-EEA location

        if (__DEV__) {
            yield AdsConsent.setDebugGeography(AdsConsentDebugGeography.NOT_EEA);
        }

        // Set the ratings information

        yield admob().setRequestConfiguration({
            maxAdContentRating: MaxAdContentRating.PG,
            tagForUnderAgeOfConsent: true
        });

        // Update the consent state

        const state = yield select();
        const consentInfo = yield AdsConsent.requestInfoUpdate([state.admob.publisher]);
        yield put(setAdMobConsent(consentInfo.status));

        // Request consent if we need to

        if (consentInfo.status == AdsConsentStatus.UNKNOWN) {

            if (consentInfo.isRequestLocationInEeaOrUnknown) {

                // EEA - we need consent

                const formResult = yield AdsConsent.showForm({
                    privacyPolicy: state.admob.privacyPolicy,
                    withPersonalizedAds: true,
                    withNonPersonalizedAds: true,
                    withAdFree: false
                });

                // Update the local state

                yield put(setAdMobConsent(formResult.status));

                // Log it back to HQ

                analytics().logEvent('admob_consent', {
                    level: formResult.status
                });

            } else {

                // Shadier parts of the world - no concent needed
                // We'll fall back to non-personalised

                yield put(setAdMobConsent(AdsConsentStatus.NON_PERSONALIZED));

            }

        }

    } catch (error) {

        // Treat add system errors as loading errors

        yield put(initialLoadFailure(error));

        // Log it out to the analytics system (if we can)

        crashlytics().recordError(error);

    }

}

/**
 * The intial load dispatching saga.
 */

export function* watchAdmob() {
    yield all([
        yield takeLatest(SET_ADMOB_PRIVACY_POLICY, adMobSaga)
    ]);
}