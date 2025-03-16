/**
 * Debug script to diagnose and fix common Metro error patterns
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');

console.log('🔎 Metro Error Diagnostics Tool');
console.log('==============================');

// Function to check if a file exists
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

// Check for common module resolution errors
console.log('\n📋 Checking for common module resolution errors...');

// 1. Check metro.config.js
const metroConfigPath = path.join(projectRoot, 'metro.config.js');
if (fileExists(metroConfigPath)) {
  const metroConfig = fs.readFileSync(metroConfigPath, 'utf8');
  
  console.log('✅ Found metro.config.js');
  
  // Check for "return undefined" pattern that causes the "Cannot read properties of undefined (reading 'type')" error
  if (metroConfig.includes('return undefined;') || metroConfig.includes('return undefined')) {
    console.log('🔧 Found "return undefined" in resolveRequest function - this can cause the "Cannot read properties of undefined (reading \'type\')" error');
    console.log('   Solution: Change it to "return null;" instead');
    
    try {
      // Auto-fix the issue
      const fixedConfig = metroConfig.replace(/return\s+undefined\s*;?/g, 'return null;');
      fs.writeFileSync(metroConfigPath, fixedConfig);
      console.log('✅ Automatically fixed metro.config.js');
    } catch (e) {
      console.error(`❌ Failed to fix metro.config.js: ${e.message}`);
    }
  }
  
  // Ensure we're returning null and not undefined
  if (!metroConfig.includes('return null;') && !metroConfig.includes('return null')) {
    console.warn('⚠️ metro.config.js may not be returning null for default resolution, which can cause errors');
  } else {
    console.log('✅ metro.config.js is correctly returning null for default resolution');
  }
}

// 2. Check entry.js file
const entryJsPath = path.join(projectRoot, 'entry.js');
if (!fileExists(entryJsPath)) {
  console.log('⚠️ entry.js is missing - this can cause module resolution errors');
  console.log('   Creating entry.js file...');
  
  const entryContent = `/**
 * Entry file for expo-router
 * Generated on ${new Date().toISOString()} by error-debug.js
 */

// This redirects to the expo-router entry point
module.exports = require('expo-router/entry-classic');

// Also directly require expo-router to ensure it's resolved
require('expo-router');

// Unique timestamp to ensure SHA-1 changes: ${Date.now()}
`;

  try {
    fs.writeFileSync(entryJsPath, entryContent, { mode: 0o666 });
    console.log('✅ Created entry.js file');
  } catch (e) {
    console.error(`❌ Failed to create entry.js: ${e.message}`);
  }
}

// 3. Check if expo-router/entry.js exists
const expoRouterEntryPath = path.join(projectRoot, 'node_modules/expo-router/entry.js');
if (!fileExists(expoRouterEntryPath)) {
  console.log('⚠️ expo-router/entry.js is missing - this will cause resolution errors');
  
  // Check if entry-classic.js exists
  const entryClassicPath = path.join(projectRoot, 'node_modules/expo-router/entry-classic.js');
  if (fileExists(entryClassicPath)) {
    console.log('   Found entry-classic.js - creating expo-router/entry.js based on it...');
    
    try {
      const classicContent = fs.readFileSync(entryClassicPath, 'utf8');
      fs.writeFileSync(expoRouterEntryPath, classicContent);
      console.log('✅ Created expo-router/entry.js file');
    } catch (e) {
      console.error(`❌ Failed to create expo-router/entry.js: ${e.message}`);
    }
  } else {
    console.log('❌ Could not find expo-router/entry-classic.js either');
  }
}

// 4. Check Metro bundler status
console.log('\n📋 Checking Metro bundler...');
try {
  const metroPackageJsonPath = path.join(projectRoot, 'node_modules/metro/package.json');
  if (fileExists(metroPackageJsonPath)) {
    const metroPackage = require(metroPackageJsonPath);
    console.log(`✅ Metro version: ${metroPackage.version}`);
  } else {
    console.error('❌ Metro package not found');
  }
} catch (e) {
  console.error(`❌ Error checking Metro: ${e.message}`);
}

console.log('\n✅ Diagnostics completed!');
console.log('\nRecommended actions:');
console.log('1. Run: node scripts/clean-cache.js');
console.log('2. Run: npm start -- --reset-cache');
console.log('3. If issues persist, try: npm run android-fixed');
