import React from 'react';
import { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Image } from 'react-native'
import { Button, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { initialLoad } from '../reducers/actions';

class SplashScreen extends Component {

    render() {
        const { loadingStatus, initialLoad } = this.props;

        if (loadingStatus == 'not_started' || loadingStatus == 'started' || loadingStatus == 'success') {

            return(
                <View style={splashStyles.parent}>
                    <Image 
                        style={splashStyles.image}
                        source={require('../assets/Logo.png')}
                        resizeMode="contain"
                    />
                    <ActivityIndicator
                        style={splashStyles.spinner}
                        size="large"
                    />
                    <Text
                        style={splashStyles.text}
                    >
                        We won't be a moment...
                    </Text>
                </View>
            );

        } else {

            return(
                <View style={splashStyles.parent}>
                    <Image 
                        style={splashStyles.image}
                        source={require('../assets/Logo.png')}
                        resizeMode="contain"
                    />
                    <Text
                        style={splashStyles.text}
                    >
                        Something went wrong trying to get a classic with every byte.
                    </Text>
                    <Button
                        mode="contained"
                        color="#FFFFFF"                    
                        style={splashStyles.button}
                        onPress={() => {initialLoad()}}
                    >
                        Try Again!
                    </Button>
                </View>
            );

        }
    }

}

const splashStyles = StyleSheet.create({
    parent: {
        flex: 1,
        alignItems: "stretch",
        flexDirection: "column",
        backgroundColor: "#7300AE",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        flex: 0,
        width: "100%",
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        padding: 20
    },
    spinner: {
        flex: 1
    },
    image: {
        flex: 3,
        width: "80%",
        height: undefined
    },
    button: {
        margin: 20
    }
});

const mapStateToProps = state => {
    return {
        loadingStatus: state.initialLoad
    };
};

const mapDispatchToProps = {
    initialLoad
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);