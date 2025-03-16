import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';

/**
 * Simple SafeArea replacement that doesn't use the problematic native events
 */
export function SimpleSafeAreaProvider({ children, style }) {
  // Use fixed insets that don't rely on native events
  const insets = {
    top: Platform.OS === 'ios' ? 44 : 28,
    bottom: Platform.OS === 'ios' ? 34 : 0,
    left: 0,
    right: 0
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212'
  }
});

// Also export a context with static values
export const SimpleSafeAreaContext = {
  Consumer: ({ children }) => children({
    top: Platform.OS === 'ios' ? 44 : 28,
    bottom: Platform.OS === 'ios' ? 34 : 0,
    left: 0,
    right: 0
  })
};
