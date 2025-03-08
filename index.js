import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);

// Ensure expo-router loads correctly with polyfill
if (!global.setImmediate) {
  global.setImmediate = setTimeout;
}
