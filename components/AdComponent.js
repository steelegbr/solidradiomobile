import React from 'react';
import { Component } from "react";
import { connect } from "react-redux";
import { BannerAd, BannerAdSize, TestIds, AdsConsentStatus } from "@react-native-firebase/admob";

class AdComponent extends Component {

    render() {

        const { nonPersonalised } = this.props;

        if (__DEV__) {
            return(
                <BannerAd 
                    unitId={TestIds.BANNER} 
                    size={BannerAdSize.FLUID}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: nonPersonalised
                    }}
                />
            );
        } else {
            return null;
        }


    }

}

const mapStateToProps = state => {
    return {
        nonPersonalised: state.admob.consent == AdsConsentStatus.NON_PERSONALIZED
    };
}

export default connect(mapStateToProps)(AdComponent);