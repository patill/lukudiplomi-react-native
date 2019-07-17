/**
 * Configuration datasource.
 *
 * @author Miika Koskela <koskela.miika.s@outlook.com>
 * @copyright Tampereen Kaupunginkirjasto, 2018-
 * @license MIT
 */

import { AsyncStorage } from 'react-native';

/**
 * Configuration data source.
 *
 * It uses AsyncStorage to cache downloaded configuration data locally.
 *
 * When trying to read configuration data, first check local cache, and if it's
 * not there, then download the data using downloader.
 */
class ConfigDatasource {

  // This class depends on downloader and URI (which is hardcoded currently)
  constructor (downloader) {
    this.uri = 'https://raw.githubusercontent.com/patill/lukudiplomi-pori-datasources/master/lukudiplomi-config.txt';
    this.downloader = downloader;
  }

  /**
   * Get configuration data for given grade.
   *
   * @param string grade
   * @returns object
   */
  getConfigFor = async (grade) => {
    let data,
      json,
      current;
    try {
      data = await this.getConfig();
      json = JSON.parse(data);
      current = json.find((entry) => {
        return entry.title === grade;
      });
    } catch (error) {

    }
    return current;
  }

  // Get all grade names, e.g. "7. luokka"
  getGrades = async () => {
    let data = null;
    try {
      data = await this.getConfig();
    } catch (error) {
      console.log(error);
    }

    return data.map(item => item.title);
  }

  // Get app configuration data, e.g. grades, their book and data URLs
  getConfig = async () => {
    let data = null;
    try {
      // First try local storage; if it's there, it's in JSON string format
      data = await AsyncStorage.getItem('lukudiplomi/asetukset');

      if (!data) {
        // If it's not there, download and make it JSON string format and store
        // it locally.
        data = JSON.stringify(await this.downloader.getData(this.uri));
        await AsyncStorage.setItem('lukudiplomi/asetukset', data);
      }
      // This is just to ensure real JSON object.
      data = JSON.parse(data);
    } catch (error) {

    }

    return data;
  }

  /**
   * Get the currently selected grade.
   *
   * If there's no such set, the value is null and it's returned. It's the
   * callers responsibility to check what this returns.
   */
  getCurrentGrade = async () => {
    let data = null;
    try {
      data = await AsyncStorage.getItem('lukudiplomi/aste');
    } catch (error) {
      console.log(error);
    }
    return data;
  }
}

export default ConfigDatasource;
