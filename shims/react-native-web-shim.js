/**
 * Shim para react-native-web/dist/index
 * Fornece implementações básicas de componentes necessários para o expo-router
 */

// Implementação minimalista dos componentes necessários
const View = function(props) { return null; };
const Text = function(props) { return null; };
const ScrollView = function(props) { return null; };
const Pressable = function(props) { return null; };
const StyleSheet = {
  create: (styles) => styles,
  compose: (...styles) => ({}),
  flatten: (style) => ({}),
};

// Plataforma - sempre simular que estamos na web
const Platform = {
  OS: 'web',
  select: (obj) => obj.web || obj.default || {},
  isTesting: false,
  isWeb: true,
};

// Exportações principais
const reactNativeWeb = {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Platform,
};

// Exportar como CommonJS
module.exports = reactNativeWeb;
module.exports.default = reactNativeWeb;
