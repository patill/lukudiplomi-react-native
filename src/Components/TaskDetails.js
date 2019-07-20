/**
 * @author Miika Koskela <koskela.miika.s@outlook.com>
 * @copyright Tampereen Kaupunginkirjasto, 2018-
 * @license MIT (see LICENSE)
 */

import React, { Component } from "react";
import {
  FlatList,
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { Icon } from "react-native-elements";

import Styles, { Colors } from "../Styles";
import ConfigDatasource from "../Datasources/ConfigDatasource";
import TaskDatasource from "../Datasources/TaskDatasource";
import Downloader from "../Downloader";
import Parser from "../Parser";
import BookListItem from "./BookListItem";
import BookDatasource from "../Datasources/BookDatasource";

/**
 * Task details view.
 *
 * @copyright Tampereen kaupunginkirjasto 2018-
 * @author Miika Koskela <koskela.miika.s@outlook.com>
 */
export default class TaskDetails extends Component {
  /**
   * Navigation options.
   */
  static navigationOptions = {
    title: "Tehtävän tiedot"
  };

  constructor(props) {
    super(props);

    // Dependencies
    let downloader = new Downloader(new Parser());
    this.config = new ConfigDatasource(downloader);
    this.books = new BookDatasource(this.config, downloader);
    this.tasks = new TaskDatasource(this.config, this.books, downloader);

    this.props.navigation.addListener("didFocus", () => {
      this.updateBooks();
    });

    // Initial state
    this.state = {
      books: []
    };
  }

  updateBooks = () => {
    let task = this.props.navigation.getParam("task");
    this.tasks
      .getBooks(task.num)
      .then(books => {
        this.setState({ books: books.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  /**
   * Cancel task
   *
   * Cancelling a task means removing books associated with it.
   */
  onCancel = () => {
    let task = this.props.navigation.getParam("task");
    this.tasks
      .removeBooks(task.num)
      .then(() => {
        this.setState({
          books: []
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  onBookmark = book => {
    this.books.toggleBookmark(book).then(() => {
      this.updateBooks();
    });
  };

  componentDidMount = () => {
    this.updateBooks();
  };

  renderButton = taskNumber => {
    return (
      <View style={Styles.taskAddBooksContainer}>
        <Text style={Styles.taskAddBooksInfo}>
          Merkitse tehtävä tehdyksi valitsemalla siihen kirjat.
        </Text>
        <TouchableOpacity
          style={Styles.button}
          onPress={() => {
            this.props.navigation.navigate("TaskBookSelect", {
              taskNumber: taskNumber
            });
          }}
        >
          <Text style={Styles.buttonText}>VALITSE KIRJAT</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderList = () => {
    return (
      <View>
        <View style={Styles.cancelTaskContainer}>
          <Text style={Styles.heading}>Kirjat</Text>
          <TouchableOpacity style={Styles.button} onPress={this.onCancel}>
            <Text style={Styles.buttonText}>PERUUTA</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            keyExtractor={(item, index) => `${item.title}:${item.author}`}
            data={this.state.books}
            extraData={this.state}
            renderItem={({ item }) => (
              <BookListItem
                item={item}
                route={"BookDetailsForTask"}
                onBookmark={this.onBookmark}
                navigation={this.props.navigation}
              />
            )}
          />
        </View>
      </View>
    );
  };

  renderCheck = () => {
    return <Icon name="check" color={Colors.Green} type="material-community" />;
  };

  render = () => {
    let task = this.props.navigation.getParam("task");
    return (
      <ScrollView style={Styles.mainContainer}>
        <View style={Styles.taskDetailsContainer}>
          <View style={Styles.taskNumberContainer}>
            <Text style={Styles.centerHeading}>{task.num}</Text>
            {this.state.books.length > 0 ? this.renderCheck() : null}
          </View>
          <View style={Styles.taskDescription}>
            <Text>{task.task}</Text>
          </View>
        </View>
        <View style={Styles.taskActionContainer}>
          {this.state.books.length < 1
            ? this.renderButton(task.num)
            : this.renderList()}
        </View>
      </ScrollView>
    );
  };
}
