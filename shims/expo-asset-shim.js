/**
 * Shim para expo-asset
 * Este arquivo fornece uma implementação simplificada quando o módulo real não pode ser resolvido.
 */

// Implementação simplificada
const ExpoAsset = {
  // Implementação básica de fallback
  isAvailable: true,
  
  // Expor um objeto genérico
  default: {},
  
  // Método padrão para evitar erros
  get: (key) => {
    console.log('expo-asset.get (shim):', key);
    return null;
  },
  
  // Método padrão para registros
  log: (message) => {
    console.log('expo-asset.log (shim):', message);
  }
};

module.exports = ExpoAsset;
