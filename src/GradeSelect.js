/**
 * @author Miika Koskela <koskela.miika.s@outlook.com>
 * @copyright Tampereen Kaupunginkirjasto, 2018-
 * @license MIT (see LICENSE)
 */

import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Picker, AsyncStorage } from 'react-native';
import Styles from './Styles';
import ConfigDatasource from './Datasources/ConfigDatasource';
import Downloader from './Downloader';
import Parser from './Parser';

/**
 * Grade selection screen.
 *
 * On this screen, user can select his / her preferred grade.
 */
export default class GradeSelect extends Component {

  static navigationOptions = {
    title: 'Valitse luokka-aste'
  };

  constructor (props) {
    super(props);
    this.config = new ConfigDatasource(new Downloader(new Parser()));
    this.state = {
      grade: '',
      grades: []
    };
  }

  componentDidMount () {
    Promise.all([
      this.config.getCurrentGrade(),
      this.config.getGrades()
    ]).then((values) => {
      this.setState({
        grade: values[0] ? values[0] : values[1][0],
        grades: values[1]
      });
    }).catch((error) => {
        console.log(error);
    });
  }

  render () {
    return (
      <View style={Styles.mainContainer}>
        <View style={Styles.container}>
          <Text style={Styles.heading}>Valitse luokka-aste</Text>
          <View style={Styles.textContainer}>
            <Text>Valitse luokka-aste, jonka kirjat ja tehtävät haluat käyttöön sovelluksessa.</Text>
          </View>
          <View>
            <Picker
              style={Styles.picker}
              selectedValue={this.state.grade}
              onValueChange={(value, index) => {
                this.setState({grade: value});
              }}
            >
              {this.state.grades.map((value, index) => (
                <Picker.Item key={index} label={value} value={value} />
              ))}
            </Picker>
          </View>
          <View>
            <TouchableOpacity
              style={Styles.button}
              onPress={() => {
                AsyncStorage.setItem('lukudiplomi/aste', this.state.grade)
                  .then(() => {
                    this.props.navigation.navigate('Home', {
                      shouldUpdateFilter: true
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
              >
              <Text style={Styles.buttonText}>TALLENNA JA JATKA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
