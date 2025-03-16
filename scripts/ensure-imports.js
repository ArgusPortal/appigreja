/**
 * Script to check and fix module imports across the project
 */
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const colorsPath = path.join(projectRoot, 'constants', 'Colors.ts');

console.log('🔍 Checking constants directory...');

// Ensure Colors.ts exists
if (fs.existsSync(colorsPath)) {
  console.log('✅ Constants/Colors.ts exists!');
} else {
  console.error('❌ Colors.ts not found at expected location:', colorsPath);
  console.log('Creating constants directory if needed...');
  
  // Create constants directory if it doesn't exist
  const constantsDir = path.join(projectRoot, 'constants');
  if (!fs.existsSync(constantsDir)) {
    fs.mkdirSync(constantsDir);
    console.log('Created constants directory');
  }
  
  // Create a basic Colors.ts file
  const colorsContent = `// Default colors for the application
const primaryColor = '#000000'; // Black
const secondaryColor = '#ffffff'; // White
const accentColor = '#505050'; // Medium gray for details
const darkBackground = '#121212'; // Nearly black dark background
const lightBackground = '#f8fafc'; // Light background

export default {
  light: {
    text: '#121212',
    background: lightBackground,
    tint: primaryColor,
    tabIconDefault: '#888888',
    tabIconSelected: primaryColor,
    card: '#ffffff',
    buttonText: '#ffffff',
    primary: primaryColor,
    secondary: secondaryColor,
    accent: accentColor,
    cardBorder: '#e0e0e0',
    highlight: '#f5f5f5'
  },
  dark: {
    text: '#ffffff',
    background: darkBackground,
    tint: secondaryColor,
    tabIconDefault: '#888888',
    tabIconSelected: secondaryColor,
    card: '#1a1a1a',
    buttonText: '#ffffff',
    primary: primaryColor,
    secondary: secondaryColor,
    accent: accentColor,
    cardBorder: '#333333',
    highlight: '#252525'
  },
};`;
  
  fs.writeFileSync(colorsPath, colorsContent);
  console.log('✅ Created default Colors.ts file');
}

console.log('\n✅ Import check complete!');
