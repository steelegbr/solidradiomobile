import React from 'react';
import { Component } from 'react';
import { BottomNavigation } from 'react-native-paper';
import TestComponent from './TestComponent';

/**
 * The main menu container
 */

export default class Menu extends Component {
  state = {
    index: 0,
    routes: [
        {
            key: 'radio',
            title: 'Radio',
            icon: 'radio'
        },
        {
          key: 'schedule',
          title: 'Schedule',
          icon: 'calendar-today'
        },
        {
          key: 'podcasts',
          title: 'Podcasts',
          icon: 'library-music'
        },
        {
          key: 'presenters',
          title: 'Presenters',
          icon: 'face'
      },
    ]
  }

  handleIndexChange = index => this.setState({ index });

  renderScene = BottomNavigation.SceneMap({
      radio: TestComponent,
      schedule: TestComponent,
      podcasts: TestComponent,
      presenters: TestComponent
  });

  render() {
      return (
        <BottomNavigation
            navigationState={this.state}
            onIndexChange={this.handleIndexChange}
            renderScene={this.renderScene}
        />
      );
  }

}