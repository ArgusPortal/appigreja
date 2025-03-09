/**
 * Shim para o módulo react quando não pode ser resolvido corretamente
 * Fornece um objeto mínimo para evitar erros de execução
 */

const createElement = function() {
  return null;
};

// Implementação mínima do React
const React = {
  createElement: createElement,
  Fragment: Symbol('Fragment'),
  version: '17.0.0',
  createContext: function() { return { Provider: {}, Consumer: {} }; },
  useCallback: function(callback) { return callback; },
  useState: function(initialValue) { return [initialValue, function(){}]; },
  useEffect: function() {},
  useContext: function() { return {}; },
  useMemo: function(factory) { return factory(); },
  useRef: function(initialValue) { return { current: initialValue }; },
  isValidElement: function() { return false; },
  memo: function(component) { return component; },
  forwardRef: function(render) { return render; }
};

// Exportar o módulo
module.exports = React;
module.exports.default = React;
