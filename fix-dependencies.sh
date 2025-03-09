#!/bin/bash

echo "🛠️  Fixing dependency issues for appigreja..."

# Clear Metro cache
echo "🧹 Clearing Metro cache..."
rm -rf node_modules/.cache
rm -rf $TMPDIR/metro-*
rm -rf .expo/

# Install missing dependencies
echo "📦 Installing missing dependencies..."
npm install babel-plugin-module-resolver --save-dev

# Install expo-router from a specific version known to work
echo "⚙️  Reinstalling expo-router..."
npm uninstall expo-router
npm install expo-router@4.0.0 --legacy-peer-deps

# Apply patches
echo "🩹 Applying patches..."
npm run postinstall

# Clear cache and restart
echo "🔄 Resetting Metro cache..."
npm start -- --reset-cache

echo "✅ Done! If you're still having issues, try running 'npm run cleanup' followed by this script again."
