
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import Menu from './Menu';
import StationCarousel from './StationCarousel'
import SplashScreen from './SplashScreen';

class Wrapper extends Component {

    render() {
        const { loadingComplete, theme } = this.props;
        if (loadingComplete) {
            return(
                <PaperProvider theme={theme}> 
                    <Menu />
                </PaperProvider>
            );
        } else {
            return(
                <PaperProvider theme={theme}> 
                    <SplashScreen />
                </PaperProvider>
            );
        }
    }

}

const mapStateToProps = state => {
    return {
        loadingComplete: state.initialLoad == 'success',
        theme: state.theme
    };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps)(Wrapper);