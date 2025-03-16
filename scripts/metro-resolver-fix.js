#!/usr/bin/env node
/**
 * Utility script to fix Metro resolver problems
 * 
 * Run this script using:
 *    node scripts/metro-resolver-fix.js
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');

console.log('🔧 Metro Resolver Fix Tool');
console.log('=======================');

// Check metro.config.js for resolver issues
const metroConfigPath = path.join(projectRoot, 'metro.config.js');
if (fs.existsSync(metroConfigPath)) {
  console.log('📋 Checking metro.config.js...');
  const content = fs.readFileSync(metroConfigPath, 'utf8');
  
  // Look for the common error pattern (returning undefined instead of null)
  if (content.includes('return undefined') && !content.match(/\/\/.*return undefined/)) {
    console.log('🔍 Found potential issue: resolver returning undefined instead of null');
    
    // Try to fix automatically
    const fixed = content.replace(/return\s+undefined\s*;/g, 'return null;');
    
    if (fixed !== content) {
      // Backup original file
      const backupPath = path.join(projectRoot, '.metro-config.js.bak');
      fs.writeFileSync(backupPath, content);
      console.log(`✅ Original file backed up to ${backupPath}`);
      
      // Write fixed file
      fs.writeFileSync(metroConfigPath, fixed);
      console.log('✅ Fixed metro.config.js to return null instead of undefined');
    }
  } else {
    console.log('✅ No resolver issues found in metro.config.js');
  }
} else {
  console.log('❌ metro.config.js not found');
}

// Make sure expo-router/_error can be resolved
const errorShimPath = path.join(projectRoot, 'shims', 'expo-router-error.js');
if (!fs.existsSync(path.dirname(errorShimPath))) {
  fs.mkdirSync(path.dirname(errorShimPath), { recursive: true });
}

if (!fs.existsSync(errorShimPath)) {
  console.log('📋 Creating fallback for expo-router/_error...');
  
  const errorContent = `/**
 * Fallback para expo-router/_error
 * Criado automaticamente pelo resolver do Metro
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErrorPage({error}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ocorreu um erro</Text>
      <Text style={styles.message}>{error?.message || 'Erro desconhecido'}</Text>
    </View>
  );
}

// Também exportamos um componente para uso na web
export function ErrorComponent({error}) {
  return ErrorPage({error});
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});`;

  fs.writeFileSync(errorShimPath, errorContent);
  console.log(`✅ Created fallback at ${errorShimPath}`);
} else {
  console.log(`✅ expo-router/_error fallback already exists at ${errorShimPath}`);
}

console.log('\n✅ Fix complete!');
console.log('\nNext steps:');
console.log('1. Run: node scripts/clean-cache.js');
console.log('2. Run: npm run android');
