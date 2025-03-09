/**
 * Shim para o módulo expo quando ele não pode ser resolvido do expo-router
 * Usando sintaxe CommonJS para evitar problemas com transformações de código
 */

// Implementação mínima das propriedades expo necessárias
const expoShim = {
  AppState: { 
    addEventListener: function() { return null; }, 
    removeEventListener: function() { return null; },
    currentState: 'active'
  },
  Linking: { 
    addEventListener: function() { return null; }, 
    removeEventListener: function() { return null; },
    createURL: function() { return ""; },
    parse: function() { return { path: "", queryParams: {} }; }
  },
  Asset: {
    loadAsync: function() { return Promise.resolve(); }
  },
  // Outros módulos que podem ser necessários
  Constants: {
    expoVersion: '0.0.0',
    manifest: {}
  }
};

// CommonJS exports sem getters
module.exports = expoShim;
module.exports.default = expoShim;
module.exports.moduleName = 'expo-shim';
