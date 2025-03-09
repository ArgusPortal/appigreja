/**
 * Shim para @react-navigation/bottom-tabs
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

// Criar navegador bottom tabs simulado
const createBottomTabNavigator = () => {
  return {
    Navigator: createEmptyComponent('BottomTabNavigator'),
    Screen: createEmptyComponent('BottomTabScreen'),
    Group: createEmptyComponent('BottomTabGroup')
  };
};

// Exportar a API simulada
module.exports = {
  createBottomTabNavigator,
  BottomTabBar: createEmptyComponent('BottomTabBar'),
  BottomTabView: createEmptyComponent('BottomTabView'),
  useBottomTabBarHeight: () => 49,
  __esModule: true
};

// Definir default export
module.exports.default = module.exports;
