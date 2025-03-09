// Import content from app.json
const path = require('path');
const fs = require('fs');

// Read app.json
let appJsonContent = {};
try {
  const appJsonPath = path.join(__dirname, './app.json');
  appJsonContent = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
} catch (e) {
  console.error('Error reading app.json:', e);
}

// Export config without wrapping in an extra expo property
module.exports = {
  ...(appJsonContent.expo || {}),
  // Add runtime overrides, but filter out problematic plugins
  plugins: [
    ...((appJsonContent.expo && appJsonContent.expo.plugins) || [])
      .filter(plugin => plugin !== 'react-native-gesture-handler'),
    "expo-router"
  ],
  // Configuração específica para Android
  android: {
    ...(appJsonContent.expo && appJsonContent.expo.android) || {},
    package: "com.igrejabatista.renovada",
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#FFFFFF"
    },
    softwareKeyboardLayoutMode: "pan",
    permissions: [
      "INTERNET",
      "ACCESS_NETWORK_STATE"
    ]
  },
  // Configuração adicional para evitar problemas de compilação
  jsEngine: "hermes",
  // Adicione configuração de Splash
  splash: {
    image: "./assets/images/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#121212"
  }
};
