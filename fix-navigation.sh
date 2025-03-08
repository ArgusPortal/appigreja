#!/bin/bash
# Script to fix navigation dependencies

echo "Fixing navigation dependencies..."

# Clean node_modules completely
rm -rf node_modules
rm -rf package-lock.json
rm -rf yarn.lock
rm -rf .expo

# Install dependencies with force to override peer dependency issues
npm install --force

# Force correct versions
npm install @react-navigation/native@^7.0.14 @react-navigation/drawer@^7.1.0 --force

# Run expo doctor to check for remaining issues
npx expo doctor --fix-dependencies

# Start with clean cache
echo "Setup complete. You can now run: npx expo start -c"
