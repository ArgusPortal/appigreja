/**
 * Shim para expo-linking
 * Este arquivo fornece uma implementação simplificada do expo-linking
 * quando o módulo real não pode ser resolvido.
 */

// Interface simplificada do expo-linking
const ExpoLinking = {
  createURL(path) {
    // Implementação básica para criar URLs
    const scheme = 'appigreja://';
    return scheme + path;
  },
  
  parse(url) {
    // Implementação básica para analisar URLs
    try {
      return new URL(url);
    } catch (e) {
      return { path: url };
    }
  },
  
  // Outros métodos comumente usados
  openURL: async (url) => {
    console.log('ExpoLinking.openURL (shim):', url);
    return true;
  },
  
  canOpenURL: async (url) => {
    console.log('ExpoLinking.canOpenURL (shim):', url);
    return true;
  },
  
  getInitialURL: async () => {
    return null;
  },
  
  addEventListener: (type, handler) => {
    console.log('ExpoLinking.addEventListener (shim):', type);
    return {
      remove: () => {
        console.log('Removed event listener for', type);
      }
    };
  },
  
  removeEventListener: (type, handler) => {
    console.log('ExpoLinking.removeEventListener (shim):', type);
  }
};

module.exports = ExpoLinking;
