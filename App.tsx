import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import Colors from './constants/Colors';

// Import Expo Router components - these must be wrapped in try/catch
let Router: any;
try {
  Router = require('expo-router');
} catch (e) {
  console.error('Failed to load expo-router, using fallback:', e);
  // Simple fallback for when expo-router is not available
  Router = {
    Stack: ({ children }: any) => children,
    Slot: ({ children }: any) => children,
    Drawer: ({ children }: any) => children,
  };
}

// Prevent the splash screen from auto-hiding
try {
  const SplashScreen = require('expo-splash-screen');
  SplashScreen.preventAutoHideAsync();
} catch (e) {
  console.warn('Could not load SplashScreen:', e);
}

export default function App() {
  // Try to load fonts if possible
  let loaded = true;
  let error = null;
  
  try {
    const { useFonts } = require('expo-font');
    const FontAwesome = require('@expo/vector-icons/FontAwesome');
    
    [loaded, error] = useFonts({
      SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
      ...FontAwesome.font,
    });
  } catch (e) {
    console.warn('Could not load fonts:', e);
  }

  // Hide splash screen when loaded
  useEffect(() => {
    try {
      if (loaded) {
        const SplashScreen = require('expo-splash-screen');
        SplashScreen.hideAsync();
      }
    } catch (e) {
      console.warn('Error hiding splash screen:', e);
    }
  }, [loaded]);
  
  if (error) console.error('Font loading error:', error);
  if (!loaded) return <View style={{flex: 1, backgroundColor: '#000'}} />;
  
  // Customized dark theme
  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: Colors.dark.background,
      card: Colors.dark.card,
      text: Colors.dark.text,
      border: Colors.dark.cardBorder,
      primary: Colors.dark.primary,
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider value={customDarkTheme}>
          <StatusBar style="light" />
          <Router.Slot />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
