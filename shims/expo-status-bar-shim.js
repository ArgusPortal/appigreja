// Fallback shim for expo-status-bar
try {
  module.exports = require('expo-status-bar');
} catch (e) {
  console.warn('expo-status-bar not found, using fallback');
  // Basic fallback implementation
  const React = require('react');
  const StatusBar = () => null;
  module.exports = { StatusBar };
}
