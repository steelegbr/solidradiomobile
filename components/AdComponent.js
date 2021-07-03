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

import React from 'react';
import { Component } from "react";
import { connect } from "react-redux";
import { BannerAd, BannerAdSize, TestIds, AdsConsentStatus } from "@react-native-firebase/admob";
import { adLoadError } from "../reducers/actions";

class AdComponent extends Component {

    render() {

        const { nonPersonalised, unitId } = this.props;

        if (__DEV__) {
            return (
                <BannerAd
                    unitId={TestIds.BANNER}
                    size={BannerAdSize.SMART_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: nonPersonalised
                    }}
                />
            );
        } else {
            return (
                <BannerAd
                    unitId={unitId}
                    size={BannerAdSize.SMART_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: nonPersonalised
                    }}
                    onAdFailedToLoad={adFailedToLoad}
                />
            );
        }


    }

}

/**
 * Handles an advert failing to load.
 * @param {error} error The error loading the advert.
 */

export function adFailedToLoad(error) {

    const { unitId } = self.props;
    adLoadError(error, unitId);

}

function mapStateToProps(state, ownProps) {
    return {
        nonPersonalised: state.admob.consent == AdsConsentStatus.NON_PERSONALIZED,
        unitId: state.admob.units[ownProps.unitId]
    };
}

const mapDispatchToProps = dispatch => {
    return {
        adLoadError: (error, unitId) => dispatch(adLoadError(error, unitId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdComponent);