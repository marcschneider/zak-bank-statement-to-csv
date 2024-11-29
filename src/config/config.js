// src/config/config.js
/**
 * @typedef {Object} AppConfig
 * @property {boolean} DEV_MODE - Enable/disable development mode logging
 * @property {string} INPUT_DIRECTORY - Directory path for input PDF files
 * @property {string} OUTPUT_DIRECTORY - Directory path for output CSV files
 * @property {string} OUTPUT_FILE_NAME - Base name for output files
 */

/** @type {AppConfig} */
export const config = {
  DEV_MODE: true,
  INPUT_DIRECTORY: 'input',
  OUTPUT_DIRECTORY: 'output',
  OUTPUT_FILE_NAME: 'transactions'
}