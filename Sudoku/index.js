/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import Main from './Main';
//import Cell from './component/Cell';
//import CellOld from './CellOld';
import Grid from './component/Grid';
//import StackCell from './component/StackCell';
import Stack from './component/Stack';

AppRegistry.registerComponent(appName, () => Main);
