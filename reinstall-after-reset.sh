#!/bin/bash

# Script to reinstall node modules after reset
echo "📦 Reinstalling dependencies after reset..."

# Remove node_modules directory
echo "🧹 Removing node_modules directory..."
rm -rf node_modules

# Remove lock files
echo "🧹 Removing lock files..."
rm -f package-lock.json
rm -f yarn.lock

# Clear cache
echo "🧼 Clearing npm cache..."
npm cache clean --force

# Install dependencies with legacy peer deps to handle React Native compatibility issues
echo "📥 Installing dependencies..."
npm install --legacy-peer-deps

# Run postinstall scripts
echo "🔧 Running postinstall scripts..."
npm run postinstall

echo "✅ Reinstall complete! Try running the app with 'npm start'"
