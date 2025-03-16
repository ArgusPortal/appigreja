/**
 * Script to fix safe area context issues
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Fixing safe area context issues');

// Function to ensure directory exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

// Create patches directory
const patchesDir = path.resolve(__dirname, '..', 'patches');
ensureDir(patchesDir);

// Create the patch file
const patchContent = `diff --git a/node_modules/react-native-safe-area-context/src/SafeAreaContext.tsx b/node_modules/react-native-safe-area-context/src/SafeAreaContext.tsx
index 8295656..ff9c701 100644
--- a/node_modules/react-native-safe-area-context/src/SafeAreaContext.tsx
+++ b/node_modules/react-native-safe-area-context/src/SafeAreaContext.tsx
@@ -4,7 +4,7 @@ import * as React from 'react';
 import {
   Dimensions,
   StyleSheet,
-  ViewProps,
+  ViewProps, Platform,
 } from 'react-native';
 import NativeSafeAreaProvider from './NativeSafeAreaProvider';
 import { EdgeInsets, InsetChangedEvent, Metrics } from './SafeArea.types';
@@ -35,6 +35,17 @@ export function SafeAreaProvider({
   children,
   ...others
 }: SafeAreaProviderProps): JSX.Element {
+  // Fix for topInsetsChange error - use static insets on Android
+  if (Platform.OS === 'android') {
+    const staticInsets = {
+      top: 24,
+      right: 0,
+      bottom: 0,
+      left: 0,
+    };
+    return React.createElement(SafeAreaInsetsContext.Provider, { value: staticInsets }, children);
+  }
+  
   const parentInsets = useParentInsets();
   const [insets, setInsets] = React.useState<EdgeInsets | null>(null);
   const [metrics, setMetrics] = React.useState<Metrics | null>(null);`;

const patchFile = path.join(patchesDir, 'react-native-safe-area-context+4.8.2.patch');
fs.writeFileSync(patchFile, patchContent);
console.log(`✅ Created patch file: ${patchFile}`);

// Create a proper entry.js file
const entryJsPath = path.resolve(__dirname, '..', 'entry.js');
const entryJsContent = `// Entry point for Expo Router
// Last updated: ${new Date().toISOString()}

import React from 'react';
import { Text, View } from 'react-native';

// Import the router classic entry
import 'expo-router/entry-classic';

// Export a proper React component as default (required by Expo Router)
// This component won't actually be rendered, but must be a valid component
export default function AppEntry() {
  return (
    <View>
      <Text>App Entry</Text>
    </View>
  );
}`;

fs.writeFileSync(entryJsPath, entryJsContent);
console.log(`✅ Created proper entry.js file: ${entryJsPath}`);

console.log('🔄 Now run the following commands to apply fixes:');
console.log('   npm run clean-cache');
console.log('   npx patch-package');
console.log('   npm run android-fixed');

// Try to run the commands automatically
try {
  console.log('🔄 Running clean-cache...');
  execSync('npm run clean-cache', { stdio: 'inherit' });
  
  console.log('🔄 Running patch-package...');
  execSync('npx patch-package', { stdio: 'inherit' });
  
  console.log('✅ All fixes applied successfully!');
} catch (error) {
  console.error('❌ Error applying fixes:', error.message);
  console.log('Please run the commands manually.');
}
