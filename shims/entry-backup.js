/**
 * DO NOT DELETE OR MODIFY THIS FILE - CRITICAL FOR APP STARTUP
 * Entry point file with proper React component default export
 * Created by fix-entry-permanent.js on 2025-03-17T23:03:50.496Z
 */
import React from 'react';
import { View } from 'react-native';

// Import expo-router entry point
import 'expo-router/entry-classic';

// We MUST export a valid React component as the default export
// This is required by Expo Router and will prevent the
// "Route './entry.js' is missing the required default export" error
export default function AppEntry() {
  // This component won't actually be rendered, but must be present
  return <View />;
}

// Add a special marker that metro.config.js can check for
// to avoid overwriting this file
// DO NOT REMOVE THIS LINE: VALID_DEFAULT_EXPORT
