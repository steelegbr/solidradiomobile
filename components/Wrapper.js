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
import { Component } from 'react';
import { connect } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import Menu from './Menu';
import SplashScreen from './SplashScreen';
import { AdsConsentStatus } from '@react-native-firebase/admob';

class Wrapper extends Component {

    render() {
        const { loadingComplete, theme } = this.props;
        if (loadingComplete) {
            return (
                <PaperProvider theme={theme}>
                    <Menu />
                </PaperProvider>
            );
        } else {
            return (
                <PaperProvider theme={theme}>
                    <SplashScreen />
                </PaperProvider>
            );
        }
    }

}

const mapStateToProps = state => {
    return {
        loadingComplete: state.initialLoad == 'success' && state.admob.consent != AdsConsentStatus.UNKNOWN,
        theme: state.theme
    };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps)(Wrapper);