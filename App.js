/**
 * The main app component.
 *
 * @author Miika Koskela <koskela.miika.s@outlook.com>
 * @copyright Tampereen Kaupunginkirjasto, 2018-
 * @license MIT (see LICENSE)
 */

import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import Styles from './src/Styles';

import Navigation from './src/Components/Navigation';
import Downloader from './src/Downloader';

// TODO: Parser can be left out when the server contains only JSON files.
import Parser from './src/Parser';
import ConfigDatasource from './src/Datasources/ConfigDatasource';

/**
 * An entry point to the Lukudiplomi application.
 *
 * It renders the app and also checks if a grade is selected.
 *
 * If the grade is not selected, then a user is redirected to the grade
 * selection screen where the user can select and save the grade.
 */
class App extends Component {
  constructor (props) {
    super(props);

    // TODO: Remove parser when you have JSON datafiles in place
    let downloader = new Downloader(new Parser({}));
    this.config = new ConfigDatasource(downloader);
  }

  /**
   * @inheritDoc
   *
   * This is RN lifecycle method. It checks if grade is already selected; if it
   * is not, then redirect to grade selection screen.
   */
  componentDidMount = () => {
    SplashScreen.hide();
    let grade = this.config.getCurrentGrade();
    grade.then((value) => {
      if (!value) {
        this.navigator && this.navigator.dispatch(
          NavigationActions.navigate({ routeName: 'GradeSelect' })
        );
        return null;
      }
    }).catch((error) => {
        console.error("[App::componentDidMount]: " + error);
    });
  }

  render = () => {
    return (
      <Navigation
        ref={(ref) => { this.navigator = ref; }}
        style={Styles.tabNavigator}
      />
    );
  }
}

export default App;

App.propTypes = {
  navigation: PropTypes.object
};
