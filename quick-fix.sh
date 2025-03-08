#!/bin/bash

# Remove node_modules
rm -rf node_modules

# Remove package lock files
rm -f package-lock.json
rm -f yarn.lock

# Clean caches
rm -rf .expo
rm -rf .metro-cache

# Install dependencies with exact matching versions
npm install --legacy-peer-deps

# Install specific packages
npm install @react-navigation/drawer@7.1.2 @react-navigation/native@7.0.15 --legacy-peer-deps --save-exact

# Create shims if they don't exist
mkdir -p shims

echo "Dependencies updated. You can now run: npm start -- --reset-cache"
