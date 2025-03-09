/**
 * Shim para expo-status-bar
 * Este arquivo fornece uma implementação simplificada quando o módulo real não pode ser resolvido.
 */

// Implementação simplificada
const ExpoStatusBar = {
  // Implementação básica de fallback
  isAvailable: true,
  
  // Expor um objeto genérico
  default: {},
  
  // Método padrão para evitar erros
  get: (key) => {
    console.log('expo-status-bar.get (shim):', key);
    return null;
  },
  
  // Método padrão para registros
  log: (message) => {
    console.log('expo-status-bar.log (shim):', message);
  }
};

module.exports = ExpoStatusBar;
