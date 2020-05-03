import { Component } from "react";
import { connect } from "react-redux";
import { BannerAd, BannerAdSize } from "@react-native-firebase/admob";

class AdCard extends Component {

    render() {
        return(
            <BannerAd></BannerAd>
        )
    }

}

const mapStateToProps = state => {
    return {
        theme: state.theme
    };
}

export default connect(mapStateToProps)(AdCard);