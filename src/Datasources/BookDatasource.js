import { AsyncStorage } from 'react-native';

/**
 * Datasource class for fetching and saving books.
 *
 * @author Miika Koskela <koskela.miika.s@outlook.com>
 * @copyright Tampereen Kaupunginkirjasto, 2018-
 * @license MIT
 */
class BookDatasource {

  // This datasource depends on configuration data and downloader class 
  constructor (config, downloader) {
    this.config = config;
    this.downloader = downloader;
  }

  /**
   * Sort books by author
   * 
   * See documentation for sort here:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
   *
   * @param {array} books The array of book objects
   */
  sortByAuthor = (books) => {
    books.sort((a, b) => {
      if (a.author > b.author) {
        return 1;
      }

      if (a.author < b.author) {
        return -1;
      }

      return 0;
    });

    return books;
  }

  // Get books from either the AsyncStorage or from the server; in case of the 
  // latter, store also to AsyncStorage.
  getBooks = async () => {
    let gradeName,  // Name of the grade, e.g. "7. luokka"
      gradeData,    // Whole object describing the grade
      settings,     // An array of gradeData objects; all grades available
      data;         // Holder for book data
    
    try {
      
      // Get the current gradeName, e.g. "7. luokka"
      gradeName = await this.config.getCurrentGrade();

      // Find whole grade-object for gradeName to get it's URI
      settings = await this.config.getConfig();
      gradeData = settings.find((entry) => {
        return entry.title === gradeName;
      });

      // Try to read book data for current gradeName
      data = await AsyncStorage.getItem(`lukudiplomi/${gradeName}`);
      
      // If there's no book data available, read it from the server; the server
      // URI is at gradeData.books.
      if (!data || data.length < 1) {
        data = JSON.stringify(await this.downloader.getData(gradeData.books));
        await AsyncStorage.setItem(`lukudiplomi/${gradeName}`, data);
      }

      // The data is currently in string format, so parse it into JSON object 
      data = JSON.parse(data);
    } catch (error) {
      console.log(error);
    }

    // Obvious, but sort the data by author
    data = this.sortByAuthor(data);

    // Return data, or if it evaluates as false, return empty array
    return data || [];
  }

  // Toggle bookmarks
  toggleBookmark = async (bookmark) => {
    
    let grade = await this.config.getCurrentGrade();
    let key = `lukudiplomi/${grade}`;
    let books = [];

    try {
      books = JSON.parse(await AsyncStorage.getItem(key)) || []; 
      books = books.map((book) => {
        // Comparing both, the title and the author is necessary to make books
        // unique; there might be multiple books from same author, so comparing
        // only by author results in weird behavior.
        if (book.title === bookmark.title && book.author === bookmark.author) {
          book.isBookmarked = !book.isBookmarked;
        }
        return book;
      }); 

      // After setting the bookmark flag, save book data back to the storage.
      await AsyncStorage.setItem(key, JSON.stringify(books));
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Extract all the tags from an array of books
   *
   * Each book is an object, which has tags property (an array). And finally
   * using set to filter out duplicates since sets cannot have them.
   *
   * @param {array} books
   */
  getTags = (books) => {
    let tags = [].concat(...books.map(book => book.tags));
    return new Set(tags.sort());
  }
}

export default BookDatasource;
