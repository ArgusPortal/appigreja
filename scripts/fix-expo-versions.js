/**
 * Script to update Expo dependencies to compatible versions
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const packageJsonPath = path.join(__dirname, '..', 'package.json');
console.log('🔧 Fixing Expo dependency versions...');

// Read the package.json
let packageJson;
try {
  packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
} catch (error) {
  console.error('❌ Failed to read package.json:', error.message);
  process.exit(1);
}

// List of packages to update
const updatedVersions = {
  '@expo/metro-runtime': '~4.0.1',
  'expo-router': '~4.0.19', 
  'react-native-gesture-handler': '~2.20.2',
  'react-native-reanimated': '~3.16.1',
  'react-native-safe-area-context': '4.12.0',
  'react-native-screens': '~4.4.0'
};

// Update dependencies
let updatesNeeded = false;
Object.entries(updatedVersions).forEach(([pkg, version]) => {
  if (packageJson.dependencies[pkg]) {
    console.log(`📝 Updating ${pkg} to ${version}`);
    packageJson.dependencies[pkg] = version;
    updatesNeeded = true;
  }
});

// Update overrides and resolutions too
['overrides', 'resolutions'].forEach(field => {
  if (packageJson[field]) {
    Object.entries(updatedVersions).forEach(([pkg, version]) => {
      if (packageJson[field][pkg]) {
        packageJson[field][pkg] = version;
      }
    });
  }
});

if (updatesNeeded) {
  // Write the updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ package.json updated with compatible versions');
  
  // Run npm install to apply changes
  console.log('📦 Installing updated dependencies...');
  try {
    execSync('npm install --legacy-peer-deps', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    console.log('✅ Dependencies installed successfully');
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
  }
} else {
  console.log('✅ No updates needed');
}

console.log('\n🔧 Next steps:');
console.log('1. Run: node run-android.js');
