import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';

// Import Router from expo-router
let Router;
try {
  Router = require('expo-router');
} catch (e) {
  console.error('Failed to load expo-router, using fallback:', e);
  Router = {
    Slot: function({ children }) { return children; }
  };
}

// Colors fallback 
const Colors = {
  dark: {
    background: '#121212',
    card: '#1a1a1a',
    text: '#ffffff',
    cardBorder: '#333333',
    primary: '#000000',
  }
};

export default function App() {
  // Basic app shell that should work regardless of TypeScript errors
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider value={DarkTheme}>
          <StatusBar style="light" />
          <Router.Slot />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
