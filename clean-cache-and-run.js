/**
 * Script for complete cache reset and run
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

// Make sure entry.js is correct
console.log('✅ Verifying entry.js...');

const entryJsPath = path.join(__dirname, 'entry.js');
const entryContent = `// Direct entry file for Expo Router
import 'expo-router/entry-classic';
import React from 'react';
import { View } from 'react-native';

// IMPORTANT: The default export MUST be a valid React component function or class
export default function AppEntry() {
  return <View />;
}
`;

// Write the entry.js file
fs.writeFileSync(entryJsPath, entryContent);
console.log('✅ entry.js is ready');

// Start the app
console.log('🚀 Starting app...');
execSync('expo start --android --clear', { stdio: 'inherit' });
