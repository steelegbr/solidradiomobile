import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { connect } from 'react-redux';

class StationCard extends Component {

    render() {
        const { station } = this.props;
        return(
            <Card>
                <Card.Cover 
                    source={{uri: station.logo}}
                    style={cardStyles.logo}
                    resizeMode="contain"
                />
                <Card.Title title={station.name} />
                <Card.Content><Text>Content 1</Text></Card.Content>
                <Card.Content><Text>Content 2</Text></Card.Content>
                <Card.Actions><Text>Some Actions</Text></Card.Actions>
            </Card>
        );
    }

}

const cardStyles = StyleSheet.create({
    logo: {
        
    },
});

function mapStateToProps(state, ownProps) {

    const station = state.stations[ownProps.stationName];
    console.log(station);

    return {
        station: {
            name: station.name,
            logo: station.logo
        }
    };

}

const mapDispatchToProps = {

};

export default connect(mapStateToProps)(StationCard);