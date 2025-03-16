// MUST LOAD FIRST: Event blocker to prevent "topInsetsChange" errors
import './BlockEvents';
import React from 'react';
import { View, Text, Platform, LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

// Suppress known warnings
LogBox.ignoreLogs([
  'Unsupported top level event type',
  'Route "./entry.js" is missing',
  '[react-native-gesture-handler]'
]);

// Very simple layout without any safe area
function AppContainer({ children }) {
  return (
    <View style={{ 
      flex: 1, 
      paddingTop: Platform.OS === 'ios' ? 44 : 24,
      backgroundColor: '#121212' 
    }}>
      {children}
    </View>
  );
}

// Simple Router with error handling
const Router = (() => {
  try {
    return require('expo-router');
  } catch (e) {
    console.error('Failed to load expo-router:', e);
    return {
      Slot: () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>Error loading router</Text>
        </View>
      )
    };
  }
})();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={DarkTheme}>
        <StatusBar style="light" />
        <AppContainer>
          <Router.Slot />
        </AppContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
