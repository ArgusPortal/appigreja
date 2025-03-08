const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add path resolver for @ imports
config.resolver.alias = {
  '@': path.resolve(__dirname),
};

// Support all needed extensions
config.resolver.assetExts.push('ttf');
config.resolver.sourceExts = [
  'js', 'jsx', 'ts', 'tsx', 'json', 'svg', 
  'native.js', 'native.jsx', 'native.ts', 'native.tsx'
];

// Ensure babel.config.js is properly used
config.transformer.babelTransformerPath = require.resolve('metro-react-native-babel-transformer');

module.exports = config;
