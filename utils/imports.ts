/**
 * Centralized imports for consistent module usage throughout the app
 * This helps avoid import errors and inconsistencies
 */

// Re-exportando importações de forma mais segura e organizada
import * as React from 'react';
import * as RN from 'react-native';
import * as ExpoIcon from '@expo/vector-icons';

// Imports básicos React - sem dependências circulares
export const {
  useState,
  useEffect, 
  useCallback,
  useMemo, 
  useRef
} = React;

export { React };

// React Native components seguros
export const {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Image, TextInput, FlatList, ActivityIndicator, Alert,
  Dimensions, Platform, Linking, ImageBackground
} = RN;

// Re-exportações Expo - para evitar conflitos de versão
export { StatusBar } from 'expo-status-bar';
export { LinearGradient } from 'expo-linear-gradient';
export const { FontAwesome } = ExpoIcon;
export { default as SplashScreen } from 'expo-splash-screen';
export { useFonts } from 'expo-font';

// Exports locais
export { default as Colors } from '@/constants/Colors';
export { Text as ThemedText, View as ThemedView } from '@/components/Themed';

// Navigation exports - importados individualmente para evitar erros de compilação
export { useRouter, usePathname, Link } from 'expo-router';
export { Stack } from 'expo-router/stack';
export { Drawer } from 'expo-router/drawer';
export { Tabs } from 'expo-router/tabs';

// Utilities - importados diretamente do arquivo
export { useSafeNavigation, useDrawerToggle, useAndroidBackHandler } from './navigationUtils';

/**
 * Usage example:
 * 
 * import { React, useState, View, Text, StyleSheet, Colors } from '@/utils/imports';
 */
