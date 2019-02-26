/**
 * @author Miika Koskela <koskela.miika.s@outlook.com>
 * @copyright Tampereen Kaupunginkirjasto, 2018-
 * @license MIT (see LICENSE)
 */

import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import Styles, { Colors } from './Styles';

/**
 * A row in task list.
 *
 * @author Miika Koskela <koskela.miika.s@outlook.com>
 * @copyright Tampereen Kaupunginkirjasto, 2018-
 * @license MIT
 */
export default class TaskListItem extends PureComponent {
  renderCheck () {
    return (
      <Icon
        name="check"
        color={Colors.Green}
        type="material-community"
      />
    );
  }

  render () {
    return (
      <TouchableOpacity
        style={Styles.containerNoPadding}
        onPress={() => {
          this.props.navigation.navigate('TaskDetails', {
            task: this.props.item
          });
        }}
      >
        <View style={Styles.taskRowItem}>
          <Text style={Styles.taskRowNumber}>{this.props.item.num}</Text>
          <Text style={Styles.taskRowDescription} numberOfLines={1}>
            {this.props.item.task}
          </Text>
          <View>
            {this.props.renderCheck ? this.renderCheck() : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

// TODO: Better validation; like objectOf (or what it was?)
TaskListItem.propTypes = {
  navigation: PropTypes.object,
  item: PropTypes.object,
  index: PropTypes.string
};
