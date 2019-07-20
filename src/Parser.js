/**
 * Parser for custom data format.
 *
 * This is a new implementation of the custom data parser. Original Android app
 * had custom data format and parser for it. All the data is in custom data
 * format so this is needed. Maybe, when the old app is no longer used, all the
 * data can be converted to JSON.
 *
 * @copyright Tampereen kaupunginkirjasto 2018-
 * @author Miika Koskela <koskela.miika.s@outlook.com>
 * @license MIT
 */
import aliases from './ParserAliases';

export default class Parser {
  constructor () {
    this.keymap = aliases;
  }

  /**
   * Parses the data given in string format
   * 
   * Returns always an array.
   * 
   * @param string data
   * @returns array
   */
  parse = (data) => {
    let result = [];

    // This regular expression matches once book description block...
    let blocks = data.match(/\[([^\]]+)\]\s+\{([^}]+)\}/g);

    // ...and this handles one block at the time using processBlock() method,
    // pushing resulting object into result array.
    blocks.forEach((block) => {
      result.push(this.processBlock(block));
    });

    return result;
  }

  processBlock = (block) => {
    // Prototype for item; initialize alternatives as an array; they were in old
    // data format marked as b-ser*
    let item = {
      'alternatives': []
    };

    // Grab the title; it's always between square brackets.
    let titleResult = /\[([^\]]+)\]/g.exec(block);
    item.title = titleResult[1];

    // Grab the rest of the data

    let dataLines = block.split('{')[1].split('|');
    if (dataLines.length < 2) {
    }

    dataLines.forEach((line) => {
      // If the line is
      line = line.trim();

      if (line.length < 4) {
        return false;
      }

      let result = /\[([^\]]+)\]:(.*)/g.exec(line);
      if (!result) {
        return false;
      }

      let key = this.keymap[result[1]];
      if (/(b-ser-\d+$)/.test(result[1])) {
        item['alternatives'].push({type: result[1], link: result[2]});
      } else if (/(b-ser-\d+-t)/.test(result[1])) {
        item['alternatives'].push({type: result[1], title: result[2]});
      } else if (result[1] === 'b-tag') {
        let tags = result[2].split(',')
          .map((item) => item.trim());
        item['tags'] = tags;
      } else if (key === undefined) {
        // TODO: This is for non-mapped keywords
        item[result[1]] = result[2];
      } else {
        item[key] = result[2];
      }
    });

    // Add some properties
    item.isBookmarked = false;
    item.isDone = false;

    // Process alternatives
    item.alternatives = this.processAlternatives(item.alternatives);

    return item;
  }

  processAlternatives = (alternatives) => {
    let result = [];

    while (alternatives.length > 0) {
      let link = alternatives.shift();
      let title = alternatives.shift();

      result.push({ uri: link.link, title: title.title });
    }

    return result;
  }
}
