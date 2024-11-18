import { AppRegistry } from 'react-native';
import App from './src/App';

AppRegistry.registerComponent('AstroTech', () => App);
AppRegistry.runApplication('AstroTech', {
  initialProps: {},
  rootTag: document.getElementById('root')
}); 