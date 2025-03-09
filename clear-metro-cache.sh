#!/bin/bash

# Script to clear Metro cache and other build artifacts
echo "🧹 Clearing Metro cache and build artifacts..."

# Clear Metro cache
echo "🔄 Clearing Metro cache..."
rm -rf .metro-cache/
rm -rf $TMPDIR/metro-* 2>/dev/null || echo "No temporary metro files to remove"

# Clear React Native cache
echo "🔄 Clearing React Native caches..."
rm -rf $TMPDIR/react-* 2>/dev/null || echo "No temporary React Native files to remove"
rm -rf $TMPDIR/haste-* 2>/dev/null || echo "No temporary Haste files to remove"

# Clear Expo cache
echo "🔄 Clearing Expo caches..."
rm -rf .expo/
rm -rf web-build/
rm -rf dist/

echo "✅ Cache cleared! Run 'npm start -- --reset-cache' to start with a fresh cache."
