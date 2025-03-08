@echo off
echo Fixing navigation dependencies...

rem Remove node_modules
rmdir /s /q node_modules

rem Remove package lock files
del package-lock.json
del yarn.lock

rem Clean caches
rmdir /s /q .expo
rmdir /s /q .metro-cache

rem Install dependencies with exact matching versions
call npm install --legacy-peer-deps

rem Install specific packages
call npm install @react-navigation/drawer@7.1.2 @react-navigation/native@7.0.15 --legacy-peer-deps --save-exact

rem Create shims if they don't exist
mkdir shims 2>nul

echo Dependencies updated. You can now run: npm start -- --reset-cache
