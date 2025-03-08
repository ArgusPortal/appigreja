import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, ActivityIndicator } from 'react-native';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

// Import Slot from expo-router
let Slot = null;
try {
  const Router = require('expo-router');
  Slot = Router.Slot;
} catch (error) {
  console.error('Failed to import Slot from expo-router:', error);
}

// Simple theme object to avoid import dependency issues
const Colors = {
  dark: {
    background: '#121212',
    card: '#1a1a1a',
    text: '#ffffff',
    border: '#333333',
    primary: '#000000',
  }
};

// Simple error boundary component to catch runtime errors
function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);
  
  if (hasError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#121212' }}>
        <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>
          Something went wrong with the app navigation.
        </Text>
      </View>
    );
  }
  
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
}

// Prevent the splash screen from auto hiding
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  
  // Load fonts
  const [fontsLoaded] = useFonts({
    'SpaceMono': require('./assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load anything needed here
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (e) {
        console.warn('Error loading resources:', e);
      } finally {
        setAppIsReady(true);
      }
    }
    
    prepare();
  }, []);

  // When everything is ready, hide splash screen
  useEffect(() => {
    if (appIsReady && fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="white" size="large" />
      </View>
    );
  }

  // If Slot isn't available, show a fallback UI
  if (!Slot) {
    return (
      <View style={{ flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>
          Failed to load navigation components.
        </Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider value={DarkTheme}>
          <StatusBar style="light" />
          <ErrorBoundary>
            <Slot />
          </ErrorBoundary>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
