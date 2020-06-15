/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import Main from './Main';
import Cell from './Cell';

AppRegistry.registerComponent(appName, () => Cell);
