// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const { FileStore } = require('metro-cache');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// Fix the Metro cache - sometimes cache issues cause missing module errors
config.cacheStores = [
  new FileStore({ root: path.join(__dirname, '.metro-cache') }),
];

// Enable all file extensions for importing
config.resolver.assetExts.push('ttf');
config.resolver.sourceExts = [
  'js', 'jsx', 'ts', 'tsx', 'json', 'svg', 
  'native.js', 'native.jsx', 'native.ts', 'native.tsx'
];

// Fix module resolution issues
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'nanoid/non-secure': path.resolve(__dirname, 'shims/nanoid-non-secure.js'),
  'expo-router/entry-classic': path.join(__dirname, 'node_modules/expo-router/build'),
};

// Custom resolution for problematic modules
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Handle specific problematic modules
  if (moduleName === 'nanoid/non-secure') {
    return {
      filePath: path.resolve(__dirname, 'shims/nanoid-non-secure.js'),
      type: 'sourceFile',
    };
  }
  
  if (moduleName === 'expo-router/entry-classic') {
    return {
      filePath: path.join(__dirname, 'node_modules/expo-router/build/index.js'),
      type: 'sourceFile',
    };
  }
  
  // Let Metro handle everything else
  return context.resolveRequest(context, moduleName, platform);
};

// Prevent duplicate module errors
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
