/**
 * @format
 */

import 'react-native-gesture-handler';

import { LogBox } from 'react-native';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';


  // fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    console.log('Fetch', { request: { uri, options, ...args }, response });
    return response;
  });
};
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
AppRegistry.registerComponent(appName, () => App);
