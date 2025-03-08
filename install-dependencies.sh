#!/bin/bash
# Script to install and verify all required dependencies

# First make sure we're on the correct Node version
echo "Checking Node version..."
node -v

# Install or reinstall specific Expo dependencies
echo "Installing Expo dependencies..."
npx expo install expo-font expo-linear-gradient expo-status-bar expo-splash-screen expo-router @expo/vector-icons

# Install or reinstall specific React Navigation dependencies
echo "Installing React Navigation dependencies..."
npx expo install @react-navigation/native @react-navigation/drawer

# Install or reinstall supporting libraries
echo "Installing supporting libraries..."
npx expo install react-native-safe-area-context react-native-screens react-native-gesture-handler

# Clear caches
echo "Clearing caches..."
rm -rf node_modules/.cache
rm -rf node_modules/.metro-cache
rm -rf .expo

# Verify installations
echo "Verifying installations..."
ls -la node_modules/expo-font
ls -la node_modules/expo-linear-gradient
ls -la node_modules/expo-status-bar
ls -la node_modules/expo-splash-screen
ls -la node_modules/expo-router
ls -la node_modules/@expo/vector-icons
ls -la node_modules/@react-navigation/native
ls -la node_modules/@react-navigation/drawer

# Create necessary shim files
echo "Creating shim files..."
mkdir -p shims

# Run a doctor check
echo "Running Expo doctor..."
npx expo doctor --fix-dependencies
