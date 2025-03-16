/**
 * Start Android app with proper cleanup and configuration
 */
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Directories to clean
const cacheDirs = [
  '.expo',
  '.metro-cache',
  'node_modules/.cache'
];

console.log('🧹 Cleaning cache directories...');

// Delete cache directories
cacheDirs.forEach(dirPath => {
  const fullPath = path.join(__dirname, dirPath);
  if (fs.existsSync(fullPath)) {
    console.log(`Removing ${dirPath}...`);
    try {
      fs.rmSync(fullPath, { recursive: true, force: true });
    } catch (e) {
      console.error(`Failed to remove ${dirPath}: ${e.message}`);
    }
  }
});

// Ensure entry.js is correct
console.log('🔧 Ensuring entry.js has proper default export...');
const entryJsPath = path.join(__dirname, 'entry.js');
const entryContent = `// Direct entry file for Expo Router
import React from 'react';
import { View } from 'react-native';
import 'expo-router/entry-classic';

// Must explicitly export a default React component
export default function AppEntry() {
  // This is the required default export
  return <View />;
}`;

// Write the entry.js file
fs.writeFileSync(entryJsPath, entryContent);
console.log('✅ entry.js is ready');

// Start the app using npx expo
console.log('🚀 Starting app with npx expo...');
try {
  // Use npx expo instead of global expo-cli
  execSync('npx expo start --android --clear', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Failed to start app:', error.message);
  console.log('\nTry running: npx expo doctor --fix-dependencies');
  console.log('Then run this script again');
}
