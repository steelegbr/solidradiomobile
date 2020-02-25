/**
 * Bottom menu bar.
 */

 import React from 'react';
 import { BottomNavigation, Text } from 'react-native-paper';

 const TestRoute = () => <Text>Test!</Text>

 export default class MenuComponent extends React.Component {

    state = {
        index: 0,
        routes: [
            {
                key: 'radio',
                title: 'Radio',
                icon: 'radio'
            }
        ]
    }

    _handleIndexChange = index => this.setState({ index });

    _renderScene = BottomNavigation.SceneMap({
        radio: TestRoute
    })

    render() {
        return (
            <BottomNavigation
                navigationState={this.state}
                onIndexChange={this._handleIndexChange}
                renderScene={this._renderScene}
            />
        );
    }

 }