/**
 * This script restores the entry.js file to a working state
 * Run it if you're getting the "missing required default export" error
 */
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const entryPath = path.join(projectRoot, 'entry.js');

console.log('🔧 Restoring entry.js with proper default export...');

const content = `/**
 * CRITICAL FILE - DO NOT MODIFY
 * Entry point for Expo Router with proper default export
 * 
 * This file MUST export a valid React component as the default export
 * or you'll get the "missing the required default export" error
 */
import React from 'react';
import { View } from 'react-native';

// Import expo-router entry point
import 'expo-router/entry-classic';

/**
 * This component won't actually be used or rendered,
 * but it MUST be exported as default or the app won't work
 */
export default function ExpoRouterEntry() {
  return <View />;
}`;

try {
  // Always overwrite the file to ensure it's correct
  fs.writeFileSync(entryPath, content);
  console.log(`✅ Successfully restored entry.js`);
  
  // Create a backup in the shims directory
  const shimsDir = path.join(projectRoot, 'shims');
  if (!fs.existsSync(shimsDir)) {
    fs.mkdirSync(shimsDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(shimsDir, 'entry-backup.js'), content);
  console.log('✅ Created backup in shims/entry-backup.js');
  
  console.log('\n🔹 Next steps:');
  console.log('1. Run: node scripts/clean-cache.js');
  console.log('2. Start your app with: npx expo start --android --clear');
} catch (error) {
  console.error('❌ Failed:', error);
}
