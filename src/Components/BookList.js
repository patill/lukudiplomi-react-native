/**
 * @author Miika Koskela <koskela.miika.s@outlook.com>
 * @copyright Tampereen Kaupunginkirjasto, 2018-
 * @license MIT (see LICENSE)
 */

// Third-party imports
import React, { Component } from "react";
import {
  FlatList,
  Modal,
  TouchableOpacity,
  View,
  Text,
  Picker
} from "react-native";
import PropTypes from "prop-types";

// My imports
import BookListItem from "./BookListItem";
import Downloader from "../Downloader";
import Parser from "../Parser";
import Styles, { Colors } from "../Styles";
import BookDatasource from "../Datasources/BookDatasource";
import ConfigDatasource from "../Datasources/ConfigDatasource";

export default class BookList extends Component {
  myBooksFilter = "omat kirjat";
  defaultFilter = "kaikki teokset";
  static navigationOptions = {
    title: "Kirjat"
  };

  constructor(props) {
    super(props);

    // This is fired when the component or screen defined by this class is
    // focused. Updating logic is done here.
    this.props.navigation.addListener("didFocus", () => {
      let shouldUpdateFilter = this.props.navigation.getParam(
        "shouldUpdateFilter"
      );
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
      tag: this.defaultFilter
    };
  }

  componentDidMount() {
    this.updateBooks(true);
  }

  /**
   * Update the books list
   *
   * @param {boolean} shouldUpdateFilter - A flag indicating should the filter be updpated
   */
  updateBooks = shouldUpdateFilter => {
    let tag = shouldUpdateFilter ? this.defaultFilter : this.state.tag;
    this.books
      .getBooks()
      .then(books => {
        let data = books.filter(book => {
          // If tag is 'kaikki kirjat', return all of them
          if (tag === this.defaultFilter) return true;

          // If tag is 'omat kirjat', return based on whether it is bookmarked
          // or not.
          if (tag === this.myBooksFilter) {
            return book.isBookmarked;
          }

          // And final filter is based on tag
          return book.tags.includes(tag);
        });

        this.setState({
          books: data,
          tags: [...this.books.getTags(books)],
          tag: tag
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  onFilter = filter => {
    this.books
      .getBooks()
      .then(books => {
        let data = books;

        // 'Omat kirjat' filter
        if (filter === this.myBooksFilter) {
          data = data.filter(book => book.isBookmarked);
        } else if (filter === this.defaultFilter) {
          // a.k.a. books = books; no filtering
        } else {
          // Filtering by tag
          data = data.filter(book => book.tags.includes(filter));
        }

        this.setState({
          books: data,
          tag: filter,
          visible: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  /**
   * Bookmarking handler
   *
   * @param {object} book - A book object
   */
  onBookmark = book => {
    this.books
      .toggleBookmark(book)
      .then(() => {
        this.updateBooks(false);
      })
      .catch(error => console.log(error));
  };

  /**
   * Renders a button to show book filter.
   */
  renderFilterButton() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState(state => {
            let visible = !state.visible;
            return { visible };
          });
        }}
        style={Styles.filterButton}
      >
        <Text>Rajaa teoksia {": " + this.state.tag}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={Styles.mainContainer}>
        {this.renderFilterButton()}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.visible}
          onRequestClose={() => {}}
        >
          <View style={Styles.modalContent}>
            <View style={Styles.modalHeadingContainer}>
              <Text style={Styles.modalHeading}>Rajaa teoksia</Text>
            </View>
            <Picker
              style={Styles.picker}
              selectedValue={this.state.tag}
              onValueChange={this.onFilter}
            >
              <Picker.Item
                key={0}
                label={this.defaultFilter}
                value={this.defaultFilter}
              />
              <Picker.Item
                key={1}
                label={this.myBooksFilter}
                value={this.myBooksFilter}
              />
              {this.state.tags.map((value, index) => (
                <Picker.Item key={index} label={value} value={value} />
              ))}
            </Picker>
            <View style={Styles.spacer} />
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
