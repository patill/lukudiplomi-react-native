/**
 * Configuration datasource.
 *
 * @author Miika Koskela <koskela.miika.s@outlook.com>
 * @copyright Tampereen Kaupunginkirjasto, 2018-
 * @license MIT
 */

import { AsyncStorage } from "react-native";
import configUri from "./../../config";

/**
 * Configuration data source.
 *
 * It uses AsyncStorage to cache downloaded configuration data locally.
 *
 * When trying to read configuration data, first check local cache, and if it's
 * not there, then download the data using downloader.
 */
class ConfigDatasource {
  // This class depends on downloader and URI
  constructor(downloader) {
    this.uri = configUri;
    this.downloader = downloader;
  }

  /**
   * Get configuration data for given grade.
   *
   * @param string grade
   * @returns object
   */
  getConfigFor = async grade => {
    let data, json, current;
    try {
      data = await this.getConfig();
      json = JSON.parse(data);
      current = json.find(entry => {
        return entry.title === grade;
      });
    } catch (error) {
      consoel.log(error);
    }
    return current;
  };

  /**
   * Get all grade names, e.g. "7. luokka"
   *
   * @returns Promise, which resolves to array of strings or an empty array
   **/
  getGrades = async () => {
    let data = [];
    try {
      // Returns Promise which resolves to JSON object
      data = await this.getConfig();
    } catch (error) {
      console.log("[ConfigDatasource::getGrades]: " + error);
    }

    return data.map(item => item.title);
  };

  /**
   * Get app configuration data, e.g. grades, their book and data URLs
   *
   * Try first local AsyncStorage, if not available from there, try downloading.
   *
   * @returns Promise, which resolves to JSON object
   **/
  getConfig = async () => {
    let data = [];
    try {
      data = await AsyncStorage.getItem("lukudiplomi/asetukset"); // returns string
      if (!data) {
        data = await this.downloader.getData(this.uri); // returns string
        if (data) {
          await AsyncStorage.setItem("lukudiplomi/asetukset", data);
        }
      }
    } catch (error) {
      console.log("[ConfigDatasource::getConfig]: " + error);
    }

    data = JSON.parse(data);
    return data;
  };

  /**
   * Get the currently selected grade.
   *
   * @returns Promise which resolves as a string
   */
  getCurrentGrade = async () => {
    let data = "";
    try {
      data = await AsyncStorage.getItem("lukudiplomi/aste");
    } catch (error) {
      console.log("[ConfigDatasource::getCurrentGrade]: " + error);
    }

    return data;
  };
}

export default ConfigDatasource;
