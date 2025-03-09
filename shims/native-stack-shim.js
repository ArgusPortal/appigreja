/**
 * Shim para @react-navigation/native-stack
 * Fornece funcionalidade mínima para evitar erros de importação
 */

// Função auxiliar para criar componentes vazios
const createEmptyComponent = (name) => {
  const component = (props) => {
    console.warn(`Usando componente shim para ${name}`);
    return null;
  };
  component.displayName = name;
  return component;
};

// Criar navegador nativo stack simulado
const createNativeStackNavigator = () => {
  return {
    Navigator: createEmptyComponent('NativeStackNavigator'),
    Screen: createEmptyComponent('NativeStackScreen'),
    Group: createEmptyComponent('NativeStackGroup')
  };
};

// Exportar a API simulada
module.exports = {
  createNativeStackNavigator,
  NativeStackView: createEmptyComponent('NativeStackView'),
  __esModule: true
};

// Definir default export
module.exports.default = module.exports;
