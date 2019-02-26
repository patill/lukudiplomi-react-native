/**
 * @author Miika Koskela <koskela.miika.s@outlook.com>
 * @copyright Tampereen Kaupunginkirjasto, 2018-
 * @license MIT (see LICENSE)
 */
import React, { PureComponent } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import Styles, { Colors } from './Styles';

export default class BookListItem extends PureComponent {
  constructor (props) {
    super(props);

    // This is a flag to prevent updating book list when returning from book
    // details view; a better solution would be using a modal view for books and
    // not using navigation here at all.
    this.props.navigation.setParams({ shouldUpdateFilter: false });
    this.state = {
      isBookmarked: this.props.item.isBookmarked
    };
  }

  getIcon (isBookmarked, onPress) {
    let icon = isBookmarked ? 'star' : 'star-outline';
    let color = isBookmarked ? Colors.Yellow : Colors.DarkGrey;
    return (
      <Icon
        name={icon}
        type="material-community"
        size={32}
        color={color}
        underlayColor={'rgba(255, 255, 255, 0)'}
        onPress={onPress}
        style={Styles.bookmark}
      />
    );
  }

  render () {
    let route = this.props.route ? this.props.route : 'BookDetails';
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate(route, {
            item: this.props.item
          });
        }}
      >
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
            <Text style={Styles.subheading}>{this.props.item.tags.join(', ')}</Text>
          </View>
          <View style={Styles.bookmarkContainer}>
            {
              this.getIcon(this.props.item.isBookmarked, () => {
                this.props.onBookmark(this.props.item);
              })
            }
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

BookListItem.propTypes = {
  item: PropTypes.object,
  route: PropTypes.string,
  navigation: PropTypes.object,
  onBookmark: PropTypes.func
};
