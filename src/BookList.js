/**
 * @author Miika Koskela <koskela.miika.s@outlook.com>
 * @copyright Tampereen Kaupunginkirjasto, 2018-
 * @license MIT (see LICENSE)
 */

// Third-party imports
import React, { Component } from 'react';
import { FlatList, Modal, TouchableOpacity, View, Text, Picker } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

// My imports
import BookListItem from './BookListItem';
import Downloader from './Downloader';
import Parser from './Parser';
import Styles, { Colors } from './Styles';
import BookDatasource from './Datasources/BookDatasource';
import ConfigDatasource from './Datasources/ConfigDatasource';

export default class BookList extends Component {

  myBooksFilter = 'omat kirjat';
  defaultFilter = 'kaikki teokset';
  defaultCat = 'kaikki tasot';
  static navigationOptions = {
    title: 'Kirjat'
  };

  constructor (props) {
    super(props);

    // This is fired when the component or screen defined by this class is
    // focused. Updating logic is done here.
    this.props.navigation.addListener('didFocus', () => {
      let shouldUpdateFilter = this.props.navigation.getParam(
        'shouldUpdateFilter');
      this.updateBooks(shouldUpdateFilter);
    });

    // Dependencies for this component
    let downloader = new Downloader(new Parser());

    this.config = new ConfigDatasource(downloader);
    this.books = new BookDatasource(this.config, downloader);

    // Initial state
    this.state = {
      selected: new Map(),
      visible: false,
      books: [],
      tags: [],
      cats: [],
      cat: this.defaultCat,
      tag: this.defaultFilter
    };
  }


  componentDidMount () {
    this.updateBooks(true);
  }

  /**
   * Update the books list
   *
   * @param {boolean} shouldUpdateFilter - A flag indicating should the filter be updpated
   */
  updateBooks = (shouldUpdateFilter) => {

    let tag = (shouldUpdateFilter ? this.defaultFilter : this.state.tag);
    let cat = (shouldUpdateFilter ? this.defaultCat : this.state.cat);
    this.books.getBooks()
      .then((books) => {
        let data = books.filter((book) => {
        //if cat is off
        if (cat === this.defaultCat) {
          // If tag is 'kaikki kirjat', return all of them
          if (tag === this.defaultFilter) return true;

          // If tag is 'omat kirjat', return based on whether it is bookmarked
          // or not.
          if (tag === this.myBooksFilter) {
            return book.isBookmarked;
          }

          // And final filter is based on tag
          return book.tags.includes(tag);
        } else {
          //no tag chosen
          if (tag === this.defaultFilter)
            return book.cats.includes(cat);

          if (tag == this.myBooksFilter)
            return book.cats.includes(cat).filter(book => book.isBookmarked);

            // finally both tag and cat apply
            return book.cats.includes(cat).filter(book => book.tags.includes(tag));

        }
        });

        this.setState({
          books: data,
          tags: [...this.books.getTags(books)],
          tag: tag,
          cats: [...this.books.getCats(books)],
          cat: cat
        });
      }).catch((error) => {
        console.log(error);
      });
  }

  onFilter = (tagFilter, catFilter) => {
    this.books.getBooks()
      .then((books) => {

        let data = books;

        // Category off:
        if (catFilter === this.defaultCat) {
          if (tagFilter === this.myBooksFilter) {
            data = data.filter(book => book.isBookmarked);
          } else if (tagFilter === this.defaultFilter) {
            // a.k.a. books = books; no filtering
          } else {
            // Filtering by tag
            data = data.filter(book => book.tags.includes(tagFilter));
          }
        } else {
          //Filtering by category
          // 'Omat kirjat' filter
          if (tagFilter === this.myBooksFilter) {
            data = data.filter(book => book.isBookmarked).filter(book => book.cats.includes(catFilter));
          } else if (tagFilter === this.defaultFilter) {
            // a.k.a. books = books; no filtering by tag
            data = data.filter(book => book.cats.includes(catFilter));
          } else {
            // Filtering by tag
            data = data.filter(book => book.tags.includes(tagFilter)).filter(book => book.cats.includes(catFilter));
          }
        }

        this.setState({
          books: data,
          tag: tagFilter,
          cat: catFilter,
          visible: false
        });
      }).catch((error) => {
        console.log(error);
      });
  }

  /**
   * Bookmarking handler
   *
   * @param {object} book - A book object
   */
  onBookmark = (book) => {
    this.books.toggleBookmark(book)
      .then(() => {
        this.updateBooks(false);
      }).catch(error => console.log(error));
  }

  /**
   * Renders a button to show book filter.
   */
  renderFilterButton () {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState((state) => {
            let visible = !state.visible;
            return { visible };
          });
        }}
        style={Styles.filterButton}
      >
        <Text>Rajaa teoksia { ': ' + this.state.tag + ' (' + this.state.cat + ')' }</Text>
      </TouchableOpacity>
    );
  }

  render () {

    return (
      <View style={Styles.mainContainer}>
        { this.renderFilterButton() }
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.visible}
          onRequestClose={() => {}}
        >
          <View style={Styles.modalContent}>
          <View style={Styles.modalHeadingContainer}>
            <Text style={Styles.modalHeading}>Valitse aihelista</Text>
          </View>
          <Picker
            style={Styles.picker}
            selectedValue={this.state.tag}
            onValueChange={(itemValue) =>
                            this.setState({tag: itemValue})}
          >
            <Picker.Item key={0} label={this.defaultFilter} value={this.defaultFilter} />
            <Picker.Item key={1} label={this.myBooksFilter} value={this.myBooksFilter} />
            {this.state.tags.map((value, index) => (
              <Picker.Item key={index} label={value} value={value} />
            ))}
          </Picker>


              <View style={Styles.modalHeadingContainer}>
                <Text style={Styles.modalHeading}>Valitse taso</Text>
              </View>
              <Picker
                style={Styles.picker}
                selectedValue={this.state.cat}
                onValueChange={(itemValue) =>
                                this.setState({cat: itemValue})}
              >
                <Picker.Item key={0} label={this.defaultCat} value={this.defaultCat} />
                {this.state.cats.map((value, index) => (
                  <Picker.Item key={index} label={value} value={value} />
                ))}
              </Picker>
              <View style={Styles.spacer}></View>
              <View style={Styles.container}>
                <TouchableOpacity
                  style={Styles.button}
                  onPress={() => {
                    this.onFilter(this.state.tag, this.state.cat)
                  }}
                  >
                  <Text style={Styles.buttonText}>KÄYTÄ</Text>
                </TouchableOpacity>
              </View>

            <View style={Styles.container}>
              <TouchableOpacity
                style={Styles.button}
                onPress={() => {
                  this.setState({
                    visible: false
                  });
                }}
                >
                <Text style={Styles.buttonText}>PERUUTA</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <FlatList
          keyExtractor={(item, index) => `${item.title}:${item.author}`}
          data={this.state.books}
          extraData={this.state}
          renderItem={({ item }) => (
            <BookListItem
              item={item}
              onBookmark={this.onBookmark}
              navigation={this.props.navigation}
            />
          )}
        />
      </View>
    );
  }
}

BookList.propTypes = {
  navigation: PropTypes.object
};
