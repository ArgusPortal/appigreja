// Fallback shim for expo-font
try {
  module.exports = require('expo-font');
} catch (e) {
  console.warn('expo-font not found, using fallback');
  // Basic fallback implementation
  module.exports = {
    useFonts: () => [true, null],
    loadAsync: async () => true,
  };
}
