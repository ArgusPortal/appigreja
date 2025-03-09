/**
 * Shim para expo-constants
 * Este arquivo fornece uma implementação simplificada quando o módulo real não pode ser resolvido.
 */

// Implementação simplificada
const ExpoConstants = {
  expoConfig: {
    name: 'Igreja Batista Renovada',
    slug: 'appigreja',
    version: '1.0.0'
  },
  
  manifest: {
    name: 'Igreja Batista Renovada',
    slug: 'appigreja',
    version: '1.0.0'
  },
  
  executionEnvironment: 'native',
  
  appOwnership: null,
  
  getAppConfig: () => ({
    name: 'Igreja Batista Renovada',
    slug: 'appigreja',
    version: '1.0.0'
  })
};

module.exports = ExpoConstants;
