// Fallback shim for @expo/vector-icons
try {
  module.exports = require('@expo/vector-icons');
} catch (e) {
  console.warn('@expo/vector-icons not found, using fallback');
  // Basic fallback implementation
  const React = require('react');
  const Text = require('react-native').Text;
  const FontAwesome = (props) => React.createElement(Text, props, '□');
  FontAwesome.font = { FontAwesome: require('../assets/fonts/SpaceMono-Regular.ttf') };
  module.exports = { FontAwesome };
}
