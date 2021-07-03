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
import { SafeAreaView, StyleSheet } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import StationCarousel from './StationCarousel';
import Settings from './Settings';
import EpgWrapper from './EpgWrapper';
import PresentersWrapper from './PresentersWrapper';

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
        key: 'presenters',
        title: 'Presenters',
        icon: 'face'
      },
      {
        key: 'settings',
        title: 'Settings',
        icon: 'cog'
      }
    ]
  }

  handleIndexChange = index => this.setState({ index });

  renderScene = BottomNavigation.SceneMap({
    radio: StationCarousel,
    schedule: EpgWrapper,
    presenters: PresentersWrapper,
    settings: Settings
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