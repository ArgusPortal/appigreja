/**
 * Shim para expo-router
 * Este arquivo fornece uma implementação simplificada quando o módulo real não pode ser resolvido.
 */

// Implementação simplificada
const ExpoRouter = {
  // Implementação básica de fallback
  isAvailable: true,
  
  // Expor um objeto genérico
  default: {},
  
  // Método padrão para evitar erros
  get: (key) => {
    console.log('expo-router.get (shim):', key);
    return null;
  },
  
  // Método padrão para registros
  log: (message) => {
    console.log('expo-router.log (shim):', message);
  }
};

module.exports = ExpoRouter;
