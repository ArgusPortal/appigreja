/**
 * Shim para expo-font
 * Este arquivo fornece uma implementação simplificada quando o módulo real não pode ser resolvido.
 */

// Implementação simplificada
const ExpoFont = {
  // Implementação básica de fallback
  isAvailable: true,
  
  // Expor um objeto genérico
  default: {},
  
  // Método padrão para evitar erros
  get: (key) => {
    console.log('expo-font.get (shim):', key);
    return null;
  },
  
  // Método padrão para registros
  log: (message) => {
    console.log('expo-font.log (shim):', message);
  }
};

module.exports = ExpoFont;
