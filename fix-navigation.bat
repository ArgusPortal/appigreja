@echo off
echo Fixing navigation dependencies...

rem Clean node_modules completely
rmdir /s /q node_modules
del package-lock.json
del yarn.lock
rmdir /s /q .expo

rem Install dependencies with force to override peer dependency issues
call npm install --force

rem Force correct versions
call npm install @react-navigation/native@^7.0.14 @react-navigation/drawer@^7.1.0 --force

rem Run expo doctor to check for remaining issues
call npx expo doctor --fix-dependencies

echo Setup complete. You can now run: npx expo start -c
