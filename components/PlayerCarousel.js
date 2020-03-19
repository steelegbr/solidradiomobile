import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import { StyleSheet, Dimensions, View } from 'react-native'
import PlayerOverlay from './PlayerOverlay';

class PlayerCarousel extends Component {

    _renderItem ({ item, index }) {
        
    }

    render() {
        const { stations, setCurrentStation } = this.props;
        const sliderWidth = Dimensions.get("window").width;
        const itemWidth = sliderWidth * 0.8;
        return(
            <View style={carouselStyles.parent}>
                <PlayerOverlay />
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={stations}
                    renderItem={this._renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    windowSize={1}
                    loop={true}
                />
            </View>
        );
    }

}

const carouselStyles = StyleSheet.create({
    parent: {
        flex: 1,
        alignItems: "stretch",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
});

const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = dispatch => {

};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCarousel);