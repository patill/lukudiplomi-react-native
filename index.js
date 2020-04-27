import { AppRegistry, YellowBox } from 'react-native';
import App from './App';

YellowBox.ignoreWarnings([
  'Warning:', 'Module RCTImageLoader',
  'Class RCTCxxModule'
]);

AppRegistry.registerComponent('PorinLukudiplomi', () => App);
