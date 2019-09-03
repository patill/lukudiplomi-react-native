/**
 * @author Miika Koskela <koskela.miika.s@outlook.com>
 * @copyright Tampereen Kaupunginkirjasto, 2018-
 * @license MIT (see LICENSE)
 */
import React, { PureComponent } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import Styles from './Styles';

export default class BookListItemSelect extends PureComponent {

  /**
   * Get an icon based on whether item is selected or not.
   *
   * @param {boolean} checked - Item status, i.e. whether it's selected or not.
   */
  getIcon = (checked) => {
    let name = checked ? 'checkbox-marked' : 'checkbox-blank-outline';
    return (
      <Icon
        name={name}
        type="material-community"
        size={24}
        underlayColor={'rgba(255, 255, 255, 0)'}
        style={Styles.bookmark}
      />
    );
  }

  /**
   * Respond to item press.
   *
   * TODO: Introduce some kind of an ID for books; the data itself doesn't have
   * any kind of id for books; for tasks, yes.
   */
  onPress = () => {
    this.props.onPress(this.props.item);
  }

  //This generates the list item where a book can be selected to be associated to a task
  render = () => {
    return (
        <View style={Styles.bookListRowItem}>
          <View style={Styles.bookCoverImageView}>
            <Image
              source={{
                uri: decodeURIComponent(this.props.item.coverImage),
                cache: 'force-cache'
              }}
              style={Styles.bookCoverImage}
            />
          </View>
          <View style={Styles.bookInfoView}>
            <Text style={Styles.heading}>{this.props.item.title}</Text>
            <Text style={Styles.subheading}>{this.props.item.author}</Text>
            <Text style={Styles.subheading}>{this.props.item.cats.join(', ')}</Text>
          </View>
          <View style={Styles.bookmarkContainer}>
            <TouchableOpacity
              onPress={this.onPress}
            >
              {this.getIcon(this.props.selected)}
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

BookListItemSelect.propTypes = {
  selected: PropTypes.bool,
  index: PropTypes.number,
  item: PropTypes.object,
  onPress: PropTypes.func
};
