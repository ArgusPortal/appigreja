// Carregue o polyfill antes de qualquer outra coisa
import './shims/safe-area-polyfill';
import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View, Text, LogBox } from 'react-native';

// Ignorar avisos específicos que podem ser causados pela nossa solução
LogBox.ignoreLogs([
  'Unsupported top level event type',
  'Route "./entry.js" is missing',
  '[react-native-gesture-handler]'
]);

// Import Router from expo-router with better error handling
let Router;
try {
  Router = require('expo-router');
  console.log('✅ expo-router carregado com sucesso');
} catch (e) {
  console.error('❌ Falha ao carregar expo-router:', e);
  // Fallback implementation
  Router = {
    Slot: ({ children }) => {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
          <Text style={{ color: '#fff' }}>Erro ao carregar router</Text>
        </View>
      );
    }
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
  // Wrap in error boundary for production safety
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
