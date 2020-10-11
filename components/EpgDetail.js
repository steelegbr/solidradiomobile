/**
 * Detailed EPG listing view.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';

class EpgDetail extends Component {

    render() {
        
    }

}

const mapStateToProps = (state, ownProps) => {

    return {
        listing: ownProps.listing,
        stationTimezone: state.stations[currentStation].timezone,
        userTimezone: state.timezone,
        currentDay: currentDay
    };

}

export default connect(mapStateToProps)(EpgDetail);