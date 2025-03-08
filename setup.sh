#!/bin/bash

# Create all necessary directories
mkdir -p shims

# Clean Metro cache
rm -rf node_modules/.metro-cache
rm -rf .metro-cache
rm -rf .expo

# Run fix dependencies script
npm run doctor

# Start the app with clean cache
echo "Starting app with clean cache..."
npx expo start -c
