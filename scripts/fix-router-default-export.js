/**
 * Script to fix the expo-router default export issue
 */
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const entryPath = path.join(projectRoot, 'entry.js');

console.log('🔧 Creating proper entry.js with default export...');

// Write a proper entry.js with React component default export
const content = `// Direct entry file for Expo Router
import React from 'react';
import { View } from 'react-native';
import 'expo-router/entry-classic';

// Must explicitly export a default React component
export default function AppEntry() {
  // This is the required default export
  return <View />;
}`;

try {
  // Remove old file if it exists
  if (fs.existsSync(entryPath)) {
    fs.unlinkSync(entryPath);
  }
  
  // Write the new file
  fs.writeFileSync(entryPath, content);
  console.log(`✅ Written entry.js with default export: ${entryPath}`);
  
  console.log('🔧 Now try running your app with:');
  console.log('npm run clean-cache && npm run android');
} catch (error) {
  console.error('❌ Failed:', error);
}
