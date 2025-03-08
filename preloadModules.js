// This file helps ensure critical modules are loaded and available

// Try to preload all critical modules
const modulesToPreload = [
  'expo-linear-gradient',
  '@expo/vector-icons',
  'expo-font',
  'expo-status-bar',
  'expo-router',
  'react-native-gesture-handler',
  'react-native-reanimated',
  'react-navigation/native',
  'react-navigation/drawer'
];

console.log('Preloading critical modules...');

// Force preload modules
modulesToPreload.forEach(moduleName => {
  try {
    const module = require(moduleName);
    console.log(`✓ Successfully preloaded ${moduleName}`);
  } catch (error) {
    console.warn(`✗ Failed to preload ${moduleName}: ${error.message}`);
    
    // Create a runtime shim for failed modules
    if (moduleName === 'expo-linear-gradient') {
      const { View } = require('react-native');
      global.ExpoLinearGradient = { LinearGradient: View };
    }
    // Add more runtime shims as needed
  }
});

module.exports = { modulesPreloaded: true };
