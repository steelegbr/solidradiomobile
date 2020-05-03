/**
 * Saga for handling admob configuration.
 */

import admob, { MaxAdContentRating, AdsConsent, AdsConsentStatus } from "@react-native-firebase/admob";
import { takeLatest, select } from "redux-saga/effects";
import { SET_ADMOB_PUBLISHER, SET_ADMOB_CONSENT, setAdMobConsent } from '../reducers/actions';

/**
 * Saga for firing up admob.
 */

function* adMobSaga() {

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
            withPersonalizedAds: true,
            withNonPersonalizedAds: true,
            withAdFree: false
        });

        yield put(setAdMobConsent(formResult.status));

    }

}

/**
 * The intial load dispatching saga.
 */

export function* watchAdmob() {
    yield all([
        yield takeLatest(SET_ADMOB_PUBLISHER, adMobSaga)
    ]);
}