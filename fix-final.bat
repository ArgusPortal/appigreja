@echo off
echo Running final dependency fix...

rem Remove everything for a clean start
rmdir /s /q node_modules
del package-lock.json
del yarn.lock
rmdir /s /q .expo
rmdir /s /q .metro-cache

rem Install with --no-save first to avoid package.json conflicts
call npm install --no-save

rem Apply patches if needed
call npx patch-package

rem Clean cache
call npx expo start --clear --no-dev --no-minify --no-interactive & taskkill /F /IM node.exe

echo "Setup complete! You can now run: npm start"
