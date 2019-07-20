/**
 * @author Miika Koskela <koskela.miika.s@outlook.com>
 * @copyright Tampereen Kaupunginkirjasto, 2018-
 * @license MIT (see LICENSE)
 */

import PropTypes from "prop-types";
import React, { Component } from "react";
import { SectionList, View, Text, TouchableOpacity, Modal } from "react-native";
import { Icon } from "react-native-elements";
import { Share } from "react-native";

import Downloader from "../Downloader";
import Parser from "../Parser";
import TaskListItem from "./TaskListItem";
import TaskDatasource from "../Datasources/TaskDatasource";
import ConfigDatasource from "../Datasources/ConfigDatasource";
import Styles, { Colors } from "../Styles";
import BookDatasource from "../Datasources/BookDatasource";

export default class TaskList extends Component {
  static navigationOptions = {
    title: "Tehtävät"
  };

  constructor(props) {
    super(props);

    // TODO: Update this explanation or move it to wiki
    // This just re-sets the state (same as it was before). It's because when
    // user changes the grade, he / she returns automatically to book listing
    // screen. But when he / she navigates to task list, it's not updated since
    // nothing has changed on that screen. This focus event listener re-sets the
    // state so it's updated and re-rendered and thus also task list is updated.
    this.props.navigation.addListener("didFocus", () => {
      this.updateTasks();
    });

    // Dependency for ConfigDatasource and TaskDatasource
    let downloader = new Downloader(new Parser());

    // Required dependecies for this class
    this.config = new ConfigDatasource(downloader);
    this.books = new BookDatasource(this.config, downloader);
    this.tasks = new TaskDatasource(this.config, this.books, downloader);

    // Initial state
    this.state = {
      grade: null,
      tasks: []
    };
  }

  /**
   * Fetch the tasks from AsyncStorage or from the network; if grade haven't
   * changed, do nothing. Otherwise just update the state which causes the list
   * to be re-rendered.
   */
  updateTasks = () => {
    this.tasks
      .getTasks()
      .then(tasks => {
        // Check if grade has changed before updating the state
        // TODO: This stops updating when focusing the page
        // NOTE: If statement was used in conjunction with componentDidUpdate
        //if (this.state.grade !== tasks.grade) {
        this.setState({
          tasks: tasks.data,
          grade: tasks.grade
        });
        //}
      })
      .catch(error => {});
  };

  componentDidMount() {
    this.updateTasks();
  }

  /**
   * onShare method for share button
   */
  onShare = () => {
    this.tasks
      .getDoneFormatted()
      .then(data => {
        Share.share(
          {
            title: "Lukudiplomin tehtävälista",
            message: data
          },
          {
            dialogTitle: "Jaa tehtävälista",
            excludedActivityTypes: []
          }
        )
          .then(data => {
            this.setState(state => {
              let visible = !state.visible;
              return { visible };
            });
          })
          .catch(error => {});
      })
      .catch(error => {});
  };

  /**
   * Format the datset to be suitable for SectionList.
   *
   * Example with the real task data:
   *
   * ```
   * [
   *   {title: 'Henkilökohtaiset tehtävät', data: [...]},
   *   {title: 'Ryhmätehtävät', data: [...]}
   * ]
   * ```
   */
  getSections() {
    let sections = [];
    let tasks = [...this.state.tasks];

    // Using set to filter duplicates from typelist
    let types = [...new Set(tasks.map(task => task.type))];

    //
    types.map(type => {
      sections.push({
        title: type,
        data: this.state.tasks.filter(entry => entry.type === type)
      });
    });

    return sections;
  }

  render() {
    return (
      <View style={Styles.mainContainer}>
        <SectionList
          keyExtractor={(item, index) => `${item.type}-${item.num}`}
          renderItem={({ item, index, section }) => {
            return (
              <TaskListItem
                item={item}
                renderCheck={!!item.isDone}
                navigation={this.props.navigation}
              />
            );
          }}
          renderSectionHeader={({ section: { title } }) => (
            <View>
              <Text style={Styles.taskRowHeading}>
                {title === "group"
                  ? "Ryhmätehtävät"
                  : "Henkilökohtaiset tehtävät"}
              </Text>
            </View>
          )}
          sections={this.getSections()}
        />
        <View style={Styles.fabModalContent}>
          <TouchableOpacity
            onPress={this.onShare}
            style={Styles.shareFabButton}
          >
            <Icon
              type="material-community"
              name="share-variant"
              color={Colors.Green}
              underlayColor="rgba(255, 255, 255, 0)"
              size={24}
              reverse
              raised
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

TaskListItem.propTypes = {
  navigation: PropTypes.object
};

TaskList.propTypes = {
  navigation: PropTypes.object
};
