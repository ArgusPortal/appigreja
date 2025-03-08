// Fallback shim for @react-navigation/native
try {
  module.exports = require('@react-navigation/native');
} catch (e) {
  console.warn('@react-navigation/native not found, using fallback');
  // Basic fallback implementation
  const React = require('react');
  module.exports = {
    NavigationContainer: ({ children }) => children,
    useNavigation: () => ({}),
    DarkTheme: {},
    DefaultTheme: {},
    ThemeProvider: ({ children }) => children,
  };
}
