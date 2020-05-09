import React from 'react';
import { Component } from "react";
import { connect } from "react-redux";
import { BannerAd, BannerAdSize, TestIds, AdsConsentStatus } from "@react-native-firebase/admob";

class AdComponent extends Component {

    render() {

        const { nonPersonalised, unitId } = this.props;

        if (__DEV__) {
            return(
                <BannerAd 
                    unitId={TestIds.BANNER} 
                    size={BannerAdSize.SMART_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: nonPersonalised
                    }}
                />
            );
        } else {
            return(
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

function adFailedToLoad(error) {
    
    const { adLoadError, unitId } = self.props;
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