/**
 * List of my own books, i.e. bookmarks.
 *
 * @author Miika Koskela <koskela.miika.s@outlook.com>
 * @copyright Tampereen Kaupunginkirjasto, 2018-
 * @license MIT (see LICENSE)
 */

// Third-party imports
import React, { Component } from "react";
import { FlatList, View } from "react-native";

// Own imports
import Parser from "../Parser";
import Downloader from "../Downloader";
import BookDatasource from "../Datasources/BookDatasource";
import ConfigDatasource from "../Datasources/ConfigDatasource";
import BookListItem from "./BookListItem";
import Styles from "../Styles";

export default class MyList extends Component {
  // The (title) text in the top bar
  static navigationOptions = {
    title: "Omat kirjat"
  };

  constructor(props) {
    super(props);

    // TODO: Add eventhandler to didFocus to refresh this screen when entering
    this.props.navigation.addListener("didFocus", () => {
      this.updateBooks();
    });

    // Downloader and ConfigDatasource are dependecies of BookDatasource
    let downloader = new Downloader(new Parser());
    let config = new ConfigDatasource(downloader);

    // BookDatasource is required elsewhere in this class
    this.books = new BookDatasource(config, downloader);

    // Initial state
    this.state = {
      books: []
    };
  }

  /**
   * Update the book list in the state object.
   *
   * First, get the full list of books. Then, filter out those which does not
   * have isBookmarked flag set.
   */
  updateBooks = () => {
    this.books
      .getBooks()
      .then(books => {
        books = books.filter(book => book.isBookmarked);
        this.setState({
          books: books
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // See RN documentation for `componentDidMount` lifecycle method.
  componentDidMount = () => {
    this.updateBooks();
  };

  // Event handler for bookmarking, i.e. tapping the star beside the book item.
  onBookmark = book => {
    this.books
      .toggleBookmark(book)
      .then(() => {
        this.updateBooks();
      })
      .catch(error => {
        console.log(error);
      });
  };

  // See RN documentation for `render` method.
  render() {
    return (
      <View style={Styles.mainContainer}>
        <FlatList
          keyExtractor={(item, index) => `${item.title}:${item.author}`}
          data={this.state.books}
          renderItem={({ item }) => (
            <BookListItem
              item={item}
              route={"MyEntry"}
              onBookmark={() => {
                this.onBookmark(item);
              }}
              navigation={this.props.navigation}
            />
          )}
        />
      </View>
    );
  }
}
