@echo off
echo Fixing module recognition issues...

echo 1. Clearing node_modules and caches...
rmdir /s /q node_modules
rmdir /s /q .expo
rmdir /s /q .metro-cache

echo 2. Reinstalling dependencies with force...
call npm install --force

echo 3. Installing specific critical packages...
call npx expo install expo-linear-gradient
call npx expo install @expo/vector-icons
call npx expo install expo-font
call npx expo install expo-status-bar
call npx expo install expo-router
call npx expo install react-native-gesture-handler@~2.14.0
call npx expo install react-native-reanimated

echo 4. Creating module shims...
mkdir shims 2>nul

echo 5. Setting up module preloader...
copy /y preloadModules.js node_modules\preloadModules.js

echo 6. Clearing watchman if available...
watchman watch-del-all 2>nul

echo 7. Clearing Metro bundler cache...
npx react-native start --reset-cache --no-interactive & taskkill /F /IM node.exe

echo All modules should now be properly recognized!
echo Start your app with: npm run clean-start
