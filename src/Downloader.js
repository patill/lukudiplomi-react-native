/**
 * Data downloader utility.
 * 
 * @author Miika Koskela <koskela.miika.s@outlook.com>
 * @copyright Tampereen Kaupunginkirjasto, 2018-
 * @license MIT (see LICENSE)
 */

import Parser from './Parser';

export default class Downloader {
  constructor (parser) {
    if (parser instanceof Parser) {
      this.parser = parser;
    }
  }

  /**
   * Get the data from the server
   * 
   * TODO: Add a way to specify also the content type; now it's hardcoded
   * 
   * @param {string} url
   */
  getData = async (url) => {
    let books = [];
    try {
      let response = await fetch(url, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8'
        }
      });

      let data = await response.text();

      books = this.parser.parse(data);
    } catch (error) {
      console.log(error);
    }

    return books;
  }
}
