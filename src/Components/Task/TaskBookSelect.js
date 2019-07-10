/**
 * @author Miika Koskela <koskela.miika.s@outlook.com>
 * @copyright Tampereen Kaupunginkirjasto, 2018-
 * @license MIT (see LICENSE)
 */

// Third-party imports
import React, { Component } from 'react';
import { FlatList, Picker, View, Text, Button, Modal, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

// Own imports
import BookListItemSelect from './BookListItemSelect';
import Downloader from './Downloader';
import Parser from './Parser';
import Styles, { Colors } from './Styles';
import BookDatasource from './Datasources/BookDatasource';
import ConfigDatasource from './Datasources/ConfigDatasource';
import TaskDatasource from './Datasources/TaskDatasource';

export default class TaskBookSelect extends Component {

  /**
   * The `headerRight` section. It contains currently Save-button (to Save all
   * the books selected for the current task) and the title shown in the top bar
   * of the app.
   */
  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <View
          style={Styles.HeaderRightButtonContainer}
        >
          <TouchableOpacity
            style={Styles.headerButton}
            onPress={() => {
              navigation.getParam('onSave')();
            }}
          >
            <Text style={Styles.buttonText}>TALLENNA</Text>
          </TouchableOpacity>
        </View>
      ),
      title: 'Valitse kirjat'
    }
  };

  constructor (props) {
    super(props);

    let downloader = new Downloader(new Parser());

    this.defaultFilter = 'kaikki teokset';
    this.myBooksFilter = 'omat kirjat';

    this.config = new ConfigDatasource(downloader);
    this.books = new BookDatasource(this.config, downloader);
    this.tasks = new TaskDatasource(this.config, this.books, downloader);

    this.props.navigation.setParams({onSave: this.onSave});

    // Initial state
    this.state = {
      selected: new Map(),
      visible: false,
      books: [],
      tags: [],
      tag: this.defaultFilter
    };
  }

  /**
   * Extract tags from the array of book objects.
   *
   * @param {array} books - An array of book objects
   */
  getTags = (books) => {
    let tags = [].concat(...books.map(book => book.tags));
    return new Set(tags.sort());
  }

  /**
   * onPress method for Save-button on the header
   */
  onSave = () => {

    let selected = this.state.selected;
    let books = this.state.books;

    // About the double-negation, see poject wiki under "Javascript"
    let selectedBooks = books.filter((book) => {
      return !!selected.get(`${book.title}:${book.author}`);
    });

    let taskNumber = this.props.navigation.getParam('taskNumber');
    this.tasks.addBooks(taskNumber, selectedBooks)
      .then(() => {
        this.props.navigation.navigate('TaskDetails', {
          shouldUpdate: true
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount () {
    this.books.getBooks()
      .then((books) => {
        this.setState({
          books: books,
          tags: [...this.getTags(books)]
        });
      }).catch((error) => {
        console.log(error);
      });
  }

  /**
   * componentDidUpdate
   *
   * This is fired when an update happens, so also when returning from the grade
   * selection screen. When navigating away from grade selection, also parameter
   * is passed (shouldUpdate) and this method checks whether it is set to true
   * or not. If it's set to true, then update books and corresponding tags and
   * set the shouldUpdate parameter to false so it's not done again and again in
   * an infinite loop. See the link below for documentation.
   *
   * @see https://reactjs.org/docs/react-component.html#componentdidupdate
   */
  componentDidUpdate () {
    let shouldUpdate = this.props.navigation.getParam('shouldUpdate');
    if (shouldUpdate === true) {
      this.props.navigation.setParams({shouldUpdate: false});
      this.books.getBooks()
        .then((books) => {
          this.setState({
            books: books,
            tags: [...this.getTags(books)]
          });

        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  onPress = (item) => {
    this.setState((state) => {
      const selected = new Map(state.selected);
      selected.set(
        `${item.title}:${item.author}`,
        !selected.get(`${item.title}:${item.author}`)
        );
      return { selected };
    });
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
        <Text>Rajaa teoksia { ': ' + this.state.tag }</Text>
      </TouchableOpacity>
    );
  }

  onFilter = (filter) => {
    this.books.getBooks()
      .then((books) => {

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
      }).catch((error) => {
        console.log(error);
      });
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
              <Text style={Styles.modalHeading}>Rajaa teoksia</Text>
            </View>
            <Picker
              style={Styles.picker}
              selectedValue={this.state.tag}
              onValueChange={this.onFilter}
            >
              <Picker.Item key={0} label={this.defaultFilter} value={this.defaultFilter} />
              <Picker.Item key={1} label={this.myBooksFilter} value={this.myBooksFilter} />
              {this.state.tags.map((value, index) => (
                <Picker.Item key={index} label={value} value={value} />
              ))}
            </Picker>
            <View style={Styles.spacer}></View>
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
          renderItem={({ item, index }) => (
            <BookListItemSelect
              item={item}
              index={index}
              selected={!!this.state.selected.get(`${item.title}:${item.author}`)}
              onPress={this.onPress}
              navigation={this.props.navigation}
            />
          )}
        />
      </View>
    );
  }
}

TaskBookSelect.propTypes = {
  navigation: PropTypes.object
};
