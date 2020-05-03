/**
 * Saga for handling admob configuration.
 */

import admob, { MaxAdContentRating, AdsConsent, AdsConsentStatus } from "@react-native-firebase/admob";
import { takeLatest, select, all, put } from "redux-saga/effects";
import { setAdMobConsent, SET_ADMOB_PRIVACY_POLICY, initialLoadFailure } from '../reducers/actions';
import crashlytics from '@react-native-firebase/analytics';
import analytics from '@react-native-firebase/analytics';

/**
 * Saga for firing up admob.
 */

function* adMobSaga() {

    try {

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