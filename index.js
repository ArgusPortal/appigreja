// Force the loader to find the modules correctly
import 'react-native-gesture-handler';

// Import exposed metro hooks directly
if (typeof require.context === 'undefined') {
  // Fix for Metro modules resolution
  (global as any).__r = require;
}

// Import the app entry directly, avoiding expo-router entry
import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);
