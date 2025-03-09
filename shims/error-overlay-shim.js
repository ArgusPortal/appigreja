/**
 * Shim para @expo/metro-runtime/src/error-overlay/ErrorOverlay
 * Este arquivo fornece uma implementação alternativa quando o componente real não está disponível
 * Implementação sem dependências externas para evitar problemas de resolução
 */

// Não importar módulos externos diretamente
// Criar uma implementação sem dependências

// Dummy implementation sem React
const ErrorOverlayComponent = {
  // Propriedades do componente simulado
  displayName: 'ErrorOverlay',
  
  // Função render simulada
  render: function(props) {
    console.warn('ErrorOverlay shim render called');
    return null;
  }
};

// Exportar uma interface compatível com o que o importador espera
const ErrorOverlay = function(props) {
  console.warn('ErrorOverlay shim invoked');
  return null;
};

// Exportação CommonJS direta sem requerer React
module.exports = {
  ErrorOverlay: ErrorOverlay,
  default: { ErrorOverlay: ErrorOverlay }
};

// Atribuir propriedades estáticas ao objeto exportado
Object.assign(module.exports.ErrorOverlay, ErrorOverlayComponent);
