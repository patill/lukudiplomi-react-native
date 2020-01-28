/**
 * @author Miika Koskela <koskela.miika.s@outlook.com>
 * @copyright Tampereen Kaupunginkirjasto, 2018-
 * @license MIT (see LICENSE)
 */

import { AsyncStorage } from 'react-native';

/**
 * A data source for tasks.
 *
 * Used for fetching tasks, books related to a task and saving books related to
 * a task.
 */
class TaskDatasource {

  // Depends on configuration class (for URIs), books datasource and downloader
  constructor (config, books, downloader) {
    this.config = config;
    this.books = books;
    this.downloader = downloader;
  }

  /**
   * Get all tasks for current grade
   *
   * Note, that current grade is stored into AsyncStorage, no passed as param.
   */
  getTasks = async () => {
    let grade, gradeData, config, tasks, done;
    try {
      grade = await this.config.getCurrentGrade();
      config = await this.config.getConfig();

      gradeData = config.find((entry) => {
        return entry.title === grade;
      });

      tasks = await AsyncStorage.getItem(`lukudiplomi/${grade}/tasks`);

      if (!tasks) {
        tasks = JSON.stringify(await this.downloader.getData(gradeData.tasks));
        await AsyncStorage.setItem(`lukudiplomi/${grade}/tasks`, tasks);
      }
    } catch (error) {
      console.log(error);
    }

    // Get tasks that are done, i.e. books have been added to it
    done = await this.getDone();
    tasks = JSON.parse(tasks);

    // Set the done flag to true for all tasks that are done; the done variable
    // is an array that contains the number of task which is done.
    tasks = tasks.map((task) => {
      if (done.includes(task.num)) {
        task.isDone = true;
      }
      return task;
    });

    return {
      grade: grade,
      data: tasks || []
    };
  }

  /**
   * Save books selected for task
   *
   * @param {number} taskNumber - A task identifying number
   * @param {array} selectedBooks - An array of books selected for task
   */
  addBooks = async (taskNumber, selectedBooks) => {
    let grade,  // Current grade names
      done,     // Done tasks
      doneKey,  // Key for storing done tasks
      taskKey;  // Storage key for books
    try {
      grade = await this.config.getCurrentGrade();

      taskKey = `lukudiplomi/${grade}/${taskNumber}`;
      doneKey = `lukudiplomi/${grade}/done`;

      await AsyncStorage.setItem(taskKey, JSON.stringify(selectedBooks));

      // Convert to object and push
      done = await AsyncStorage.getItem(doneKey);
      done = JSON.parse(done) || [];
      done.push(taskNumber);

      // Filter out duplicates using the set.
      done = new Set(done);

      // Save data
      await AsyncStorage.setItem(doneKey, JSON.stringify([...done]));
    } catch (error) {
      console.log(error);
    }

    return done;
  }

  removeBooks = async (taskNumber) => {
    let grade,  // Current grade names
      done,     // Done tasks
      doneKey,  // Key for storing done tasks
      taskKey;  // Storage key for books
    try {
      grade = await this.config.getCurrentGrade();

      taskKey = `lukudiplomi/${grade}/${taskNumber}`;
      doneKey = `lukudiplomi/${grade}/done`;

      await AsyncStorage.removeItem(taskKey);

      // Convert to object and remove
      done = await AsyncStorage.getItem(doneKey);
      done = JSON.parse(done) || [];
      done = done.filter(n => n !== taskNumber);

      // Filter out duplicates
      done = new Set(done);
      // Save data
      await AsyncStorage.setItem(doneKey, JSON.stringify([...done]));
    } catch (error) {}

    return done;
  }

  getDone = async () => {
    let grade,
      done,
      doneKey;

    try {
      grade = await this.config.getCurrentGrade();
      doneKey = `lukudiplomi/${grade}/done`;

      done = JSON.parse(await AsyncStorage.getItem(doneKey)) || [];
    } catch (error) {
      console.log(error);
    }

    return done;
  }

  getDoneFormatted = async () => {
    let tasksFormatted = '';
    let tasks,
      done,
      tasksData,
      formatted;
    try {
      tasks = await this.getTasks();
      done = tasks.data.filter(task => task.isDone);

      await Promise.all(
        done.map(task => this.getBooks(task.num))
      )
        .then((data) => {
          // The `data` parameter is now an array of task objects, where keys
          // are grade, taskNumber, and data.
          tasksData = data.map((task) => {
            let taskObject = tasks.data.find((item) => item.num === task.taskNumber);
            task.text = taskObject.task || '';
            return task;
          });
        })
        .catch((error) => {});
    } catch (e) {}

    let date = new Date();

    // TODO: Show date and month with leading zeros
    // NOTE: That, getMonth() returns one less than current real month, since it
    // begins numbering from zero, i.e. 0 = January.
    let today = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

    tasksData.map((item) => {
      tasksFormatted += `${item.taskNumber}. ${item.text}\n`;
      tasksFormatted += item.data.map((book) => {
        return `- ${book.title}; ${book.author}`;
      }).join('\n');
      tasksFormatted += '\n';
    });

    let grade = '';
    try {
      grade = await this.config.getCurrentGrade();
    } catch (error) {
      console.log(error);
    }

    formatted = `Porin lukudiplomi: Tehtävälista ja kirjavalinnat (tallennettu ${today})\n\nTehtävät:\n\n${tasksFormatted}\n`;
    return formatted || '';
  }

  /**
   * Get books by taskNumber
   *
   * @param {number} taskNumber - A task identifying number
   */
  getBooks = async (taskNumber) => {
    let grade, // Current grade name
      key, // Key under which the books are stored
      books, // List of books for current grade
      booksForTask;
    try {
      // The current grade
      grade = await this.config.getCurrentGrade();

      // Books for current grade and taskNumber
      key = `lukudiplomi/${grade}/${taskNumber}`;
      books = JSON.parse(await AsyncStorage.getItem(key)) || [];

      // Get all books
      booksForTask = await this.books.getBooks();

      // Filter out those that are not associated with the current taskNumber
      booksForTask = booksForTask.filter((bookForTask) => {
        return books.find((book) => {
          return bookForTask.title === book.title && bookForTask.author === book.author
        }) ? true : false;
      });

    } catch (error) {
      console.log(error);
    }

    return {
      grade: grade,
      taskNumber: taskNumber,
      data: booksForTask || []
    };
  }
}

export default TaskDatasource;
