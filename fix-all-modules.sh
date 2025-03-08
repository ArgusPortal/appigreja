#!/bin/bash

# Exit on error
set -e

echo "======================================================="
echo "Starting comprehensive module and dependency fix script"
echo "======================================================="

# 1. Clean out node_modules completely
echo "Cleaning node_modules..."
rm -rf node_modules
rm -rf package-lock.json
rm -rf yarn.lock

# 2. Clean caches thoroughly
echo "Cleaning caches..."
rm -rf .expo
rm -rf .metro-cache
npm cache clean --force
npx expo-doctor clean

# 3. Create shims directory and ensure it exists
echo "Creating shims directory..."
mkdir -p shims

# 4. Install dependencies with legacy peer deps to avoid conflicts
echo "Installing dependencies with legacy peer deps..."
npm install --legacy-peer-deps

# 5. Force install specific versions of problematic packages
echo "Installing specific versions of critical packages..."
npx expo install react-native-gesture-handler@~2.14.0
npx expo install react-native-reanimated@~3.16.1
npx expo install expo-router@^4.0.0
npx expo install expo-font@~13.0.0
npx expo install expo-linear-gradient@~14.0.0
npx expo install expo-status-bar@~2.0.0
npx expo install expo-splash-screen@~0.29.0
npx expo install @expo/vector-icons@^14.0.0
npx expo install @react-navigation/native@^7.0.0
npx expo install @react-navigation/drawer@^7.1.0

# 6. Patch problematic packages
echo "Running patch-package..."
npx patch-package

# 7. Run expo doctor to check remaining issues
echo "Running expo doctor..."
npx expo doctor --fix-dependencies

# 8. Final check and report
echo "======================================================="
echo "Module fix process completed."
echo "If you still have issues, try running: npm start -- --reset-cache"
echo "======================================================="
