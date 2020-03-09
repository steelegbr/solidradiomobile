import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, StyleSheet } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import TestComponent from './TestComponent';
import StationCarousel from './StationCarousel';

/**
 * The main menu container
 */

class Menu extends Component {
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
      {
        key: 'settings',
        title: 'Settings',
        icon: 'settings'
      }
    ]
  }

  handleIndexChange = index => this.setState({ index });

  renderScene = BottomNavigation.SceneMap({
      radio: StationCarousel,
      schedule: TestComponent,
      podcasts: TestComponent,
      presenters: TestComponent,
      settings: TestComponent
  });

  render() {
      const { styles, theme } = this.props;
      return (
        <SafeAreaView style={styles.container}>
          <BottomNavigation
            navigationState={this.state}
            onIndexChange={this.handleIndexChange}
            renderScene={this.renderScene}
            theme={theme}
          />
        </SafeAreaView>
        
      );
  }

}

const mapStateToProps = state => {
  return {
    styles: StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: state.theme.colors.background
      }
    }),
    theme: state.theme
  };
};

export default connect(mapStateToProps)(Menu);