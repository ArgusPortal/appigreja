/**
 * Shim para react-native que redireciona para o módulo real
 * Este arquivo é usado quando o bundler não consegue resolver o módulo react-native
 */

// Tenta obter o módulo react-native real
let reactNative;

try {
  reactNative = require('../node_modules/react-native');
} catch (e) {
  console.error('Erro ao importar react-native:', e);
  
  // Implementação fallback mínima
  reactNative = {
    Platform: { OS: 'android', select: (obj) => obj.android || obj.default || {} },
    StyleSheet: {
      create: (styles) => styles,
      flatten: (style) => ({}),
    },
    View: () => null,
    Text: () => null,
    Image: () => null,
    TouchableOpacity: () => null,
    ScrollView: () => null,
  };
}

// Exportar o módulo
module.exports = reactNative;
