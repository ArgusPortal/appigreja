/**
 * Entry file for Expo Router
 * This file MUST export a default React component
 */
import React from 'react';
import { View } from 'react-native';

// Import the entry point module
import 'expo-router/entry-classic';

// Export a proper React component as default (required by Expo Router)
export default function AppEntry() {
  return <View />; // This component won't be rendered, but is required
}
