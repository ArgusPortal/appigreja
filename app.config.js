// Import content from app.json
const path = require('path');
const fs = require('fs');

// Read app.json
const appJsonPath = path.join(__dirname, './app.json');
const appJsonContent = fs.readFileSync(appJsonPath, 'utf8');
const appJson = JSON.parse(appJsonContent);

// Export config without wrapping in an extra expo property
module.exports = {
  ...appJson.expo,
  // Add runtime overrides only if needed
  plugins: [
    ...(appJson.expo.plugins || []),
    "expo-router",
    "react-native-gesture-handler"
  ]
};
