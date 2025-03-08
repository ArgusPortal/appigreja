const fs = require('fs');
const path = require('path');

// Create shims directory if it doesn't exist
const shimDir = path.join(__dirname);
if (!fs.existsSync(shimDir)) {
  fs.mkdirSync(shimDir, { recursive: true });
  console.log('Created shim directory');
}

// Make sure all shim files exist
const requiredShims = [
  'expo-linear-gradient-shim.js',
  'expo-vector-icons-shim.js',
  'expo-font-shim.js',
  'expo-status-bar-shim.js',
  'expo-router-shim.js',
  'gesture-handler-shim.js',
  'react-navigation-native-shim.js'
];

// Create basic shim template for any missing shims
requiredShims.forEach(shimFile => {
  const shimPath = path.join(__dirname, shimFile);
  if (!fs.existsSync(shimPath)) {
    const moduleName = shimFile.replace('-shim.js', '');
    const shimContent = `
// Auto-generated fallback shim for ${moduleName}
try {
  module.exports = require('${moduleName}');
} catch (e) {
  console.warn('${moduleName} not found, using fallback');
  module.exports = {};
}
`;
    fs.writeFileSync(shimPath, shimContent);
    console.log(`Created shim for ${moduleName}`);
  }
});
