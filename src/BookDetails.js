/**
 * BookDetails.js
 * 
 * This file contains a screen which shows book details; it shows following.
 * 
 * - Cover image
 * - Author
 * - Title
 * - Description 
 * - Availability link, additional information and alternative books in series
 * 
 * @copyright Tampereen kaupunginkirjasto 2018-
 * @author Miika Koskela <koskela.miika.s@outlook.com>
 * @license MIT
 */

// Third-party imports
import React, { Component } from 'react';
import { View, ScrollView, FlatList, TouchableOpacity, Text, Button, Linking } from 'react-native';
import PropTypes from 'prop-types';

// My imports
import Styles, { Colors } from './Styles';
import BookListItem from './BookListItem';
import Downloader from './Downloader';
import Parser from './Parser';
import ConfigDatasource from './Datasources/ConfigDatasource';
import BookDatasource from './Datasources/BookDatasource';


/**
 * Book details view.
 *
 * This shows all details available for one book. Currently, details include
 * title, author, coverImage, tags, description and availability link.
 */
export default class BookDetails extends Component {

  /**
   * Navigation options.
   *
   * Setting the title in the top navigation bar dynamically. If it's not
   * available, use string 'Untitled'.
   */
  static navigationOptions = {
    title: 'Kirjan tiedot'
  };

  constructor (props) {
    super(props);

    let downloader = new Downloader(new Parser());
    this.config = new ConfigDatasource(downloader);
    this.books = new BookDatasource(this.config, downloader);

    // Initial state is a book item, which is passed to this view as navigation
    // parameter. It is a complete book object, and it's properties can be
    // accessed like `item.author`.
    this.state = {
      item: this.props.navigation.getParam('item')
    };
  }

  updateBooks = () => {
    this.books.getBooks()
      .then((books) => {
        let book = books.find((book) => {
          return book.title === this.state.item.title && book.author === this.state.item.author;
        });
        
        this.setState({
          item: book
        });
      }).catch((error) => {
        console.log(error);
      });
  }

  onBookmark = () => {
    this.books.toggleBookmark(this.state.item)
      .then(() => {
        this.updateBooks();
      }).catch((error) => {
        console.log(error);
      });
  }

  /**
   * Render alternative books list.
   * 
   * Alternative books are rendered as a list, where there's book title and then
   * a button to open availability or description page in the web library.
   * 
   * If the link cannot be opened for some reason, an alert window is shown to
   * the user. 
   */
  renderAlternatives () {
    return (
      <View style={Styles.alternativesContainer}>
        <View style={Styles.container}>
          <Text style={Styles.heading}>
            Vaihtoehtoiset kirjat
          </Text>
        </View>
        {this.state.item.alternatives.map((entry, index) => {
          return (
            <View key={`alternative-item-${index}`} style={Styles.alternativesAvailability}>
              <Text style={Styles.wrappingText} key={`title-${index}`}>{entry.title}</Text>
              <TouchableOpacity style={Styles.alternatives} key={`alternatives-${index}`}
                style={Styles.button}
                onPress={() => {
                  let uri = decodeURIComponent(entry.uri);
                  Linking
                    .canOpenURL(uri)
                    .then((supported) => {
                      Linking.openURL(uri)
                        .catch((error) => {
                          alert('Selainta ei voitu avata saatavuustietojen tarkistamiseksi.');
                        });
                    })
                    .catch((error) => {

                    });
                }}
              >
                <Text style={Styles.buttonText}>SAATAVUUSTIEDOT</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  }

  /**
   * Renders additional information block. The information is passed as an 
   * argument to this method.
   * 
   * @param {string} content 
   */
  renderInformation = (content) => {
    return (
      <View style={Styles.container}>
        <Text style={Styles.heading}>Lisätietoja</Text>
        <Text>{content}</Text>
      </View>
    );
  }

  /**
   * Book details may have some kind of help text; this renders the help text 
   * block.
   * 
   * The text content is given as an argument.
   */
  renderHelp = (helpText) => {
    return (
      <View style={Styles.container}>
        <Text style={Styles.heading}>Ohje</Text>
        <Text>{helpText}</Text>
      </View>
    );
  }

  /**
   * Main render function of this screen.
   * 
   * See React / React Native documentation for this function.
   */
  render () {
    // Currently, description data has \\n entries where there should be
    // a line break; replacing them with real line breaks for now.
    this.state.item.description = this.state.item.description.replace(/\\n/g, '\n');
    return (
      <View style={Styles.mainContainer}>
        <ScrollView>
          <BookListItem
            item={this.state.item}
            selected={this.state.item.isBookmarked}
            onBookmark={this.onBookmark}
            navigation={this.props.navigation}
          />
          <View style={Styles.container}>
            <View style={Styles.availabilityContainer}>
              <Text style={Styles.heading}>Kuvaus</Text>
              <TouchableOpacity
                style={Styles.button}
                onPress={() => {
                  let uri = decodeURIComponent(this.state.item.availability);
                  Linking
                    .canOpenURL(uri)
                    .then((supported) => {
                      Linking.openURL(uri)
                        .catch((error) => {
                          alert('Selainta ei voitu avata saatavuustietojen tarkistamiseksi.');
                        });
                    })
                    .catch((error) => {

                    });
                }}
                >
                <Text style={Styles.buttonText}>SAATAVUUSTIEDOT</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={Styles.text}>{this.state.item.description}</Text>
            </View>
          </View>
          { this.state.item.help ? this.renderHelp(this.state.item.help) : null }
          { this.state.item.additionalInformation ? this.renderInformation(this.state.item.additionalInformation) : null }
          { this.state.item.alternatives.length > 0 ? this.renderAlternatives() : null }
        </ScrollView>
      </View>
    );
  }
}

// TODO: better type validation; at least navigation can have better, like
// PropTypes.objectOf etc.
BookDetails.propTypes = {
  item: PropTypes.object,
  navigation: PropTypes.object
};
