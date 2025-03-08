#!/bin/bash
# Script to fix Expo configuration issues

# Remove react-native types (as types are included in react-native)
npm uninstall @types/react-native

# Update dependencies to match Expo SDK requirements
npm install @expo/config-plugins@~9.0.0
npm install @types/react@~18.3.12
npm install jest-expo@~52.0.5

# Clean caches
rm -rf node_modules/.expo
rm -rf node_modules/.cache
rm -rf .expo

# Reinstall if needed
# npm install

# Run Expo doctor to check for remaining issues
npx expo doctor --fix-dependencies
