const path = require('path');
const fs = require('fs');

// List of modules with fallback shim locations
const MODULE_SHIMS = {
  'expo-linear-gradient': path.resolve(__dirname, 'shims/expo-linear-gradient-shim.js'),
  '@expo/vector-icons': path.resolve(__dirname, 'shims/expo-vector-icons-shim.js'),
  'expo-font': path.resolve(__dirname, 'shims/expo-font-shim.js'),
  'expo-status-bar': path.resolve(__dirname, 'shims/expo-status-bar-shim.js'),
  'expo-router': path.resolve(__dirname, 'shims/expo-router-shim.js'),
  'react-native-gesture-handler': path.resolve(__dirname, 'shims/gesture-handler-shim.js'),
  '@react-navigation/native': path.resolve(__dirname, 'shims/react-navigation-native-shim.js'),
};

/**
 * Returns the path to the real module if available, otherwise returns the shim
 */
function resolveModuleWithFallback(moduleName) {
  try {
    // Try to resolve the actual module first
    return require.resolve(moduleName);
  } catch (err) {
    // If that fails and we have a shim, use the shim
    if (MODULE_SHIMS[moduleName] && fs.existsSync(MODULE_SHIMS[moduleName])) {
      console.log(`Using shim for ${moduleName}`);
      return MODULE_SHIMS[moduleName];
    }
    // Otherwise, rethrow the error
    throw err;
  }
}

// Register our custom require hook
const originalRequire = module.constructor.prototype.require;
module.constructor.prototype.require = function(moduleName) {
  try {
    // Special handling for modules with shims
    if (MODULE_SHIMS[moduleName]) {
      const resolvedPath = resolveModuleWithFallback(moduleName);
      return originalRequire.call(this, resolvedPath);
    }
    // Default behavior for all other modules
    return originalRequire.call(this, moduleName);
  } catch (err) {
    console.error(`Error requiring module ${moduleName}:`, err.message);
    throw err;
  }
};

module.exports = {
  resolveModuleWithFallback
};
