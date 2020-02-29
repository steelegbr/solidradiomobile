
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Menu from './Menu';
import SplashScreen from './SplashScreen';

class Wrapper extends Component {

    render() {
        const { loadingComplete } = this.props;
        if (loadingComplete) {
            return(<Menu />);
        } else {
            return(<SplashScreen />);
        }
    }

}

const mapStateToProps = state => {
    return {
        loadingComplete: state.initialLoad == 'success'
    };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps)(Wrapper);