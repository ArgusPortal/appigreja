// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// Enable all file extensions for importing
config.resolver.assetExts.push('ttf');
config.resolver.sourceExts = [
  'js', 'jsx', 'ts', 'tsx', 'json', 'svg', 
  'native.js', 'native.jsx', 'native.ts', 'native.tsx'
];

// Directly resolve problematic modules to our shims
config.resolver.extraNodeModules = {
  'nanoid/non-secure': path.resolve(__dirname, 'shims/nanoid-non-secure.js')
};

// Custom resolution for problematic modules
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Redirect nanoid/non-secure to our shim
  if (moduleName === 'nanoid/non-secure') {
    return {
      filePath: path.resolve(__dirname, 'shims/nanoid-non-secure.js'),
      type: 'sourceFile',
    };
  }
  
  // Let Metro handle everything else
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
