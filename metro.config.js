// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const { FileStore } = require('metro-cache');
const fs = require('fs');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// Fix the Metro cache - sometimes cache issues cause missing module errors
config.cacheStores = [
  new FileStore({ root: path.join(__dirname, '.metro-cache') }),
];

// Enable all file extensions for importing
config.resolver.assetExts.push('ttf');
config.resolver.sourceExts = [
  'js', 'jsx', 'ts', 'tsx', 'json', 'svg', 
  'native.js', 'native.jsx', 'native.ts', 'native.tsx'
];

// Otimizações para Android
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

// Log para depuração
console.log('Configurando Metro com suporte a shims de módulos');

// Função auxiliar para verificar se um arquivo existe
const fileExists = (filePath) => {
  try {
    return fs.existsSync(filePath);
  } catch (e) {
    return false;
  }
};

// Mapeamento direto de módulos
const shimMapping = {
  'nanoid/non-secure': './shims/nanoid-non-secure.js',
  'expo-router/entry-classic': './node_modules/expo-router/build/index.js',
  'expo-router/node/render': './shims/router-render-shim.js',
  'expo-router/node/render.js': './shims/router-render-shim.js',
  '@expo/metro-runtime/src/error-overlay/ErrorOverlay': './shims/error-overlay-shim.js',
  'expo': './shims/expo-shim.js',
  '@babel/runtime/helpers/interopRequireDefault': './shims/babel-runtime-shim.js',
  '@babel/runtime/helpers/objectWithoutProperties': './shims/babel-helpers-objectWithoutProperties.js',
  '@react-navigation/native-stack': './shims/native-stack-shim.js',
  '@react-navigation/bottom-tabs': './shims/bottom-tabs-shim.js',
  'react-native-web': './shims/react-native-web/dist/index.js',
  'react-native-web/dist/index': './shims/react-native-web/dist/index.js',
  'react-native-web/dist': './shims/react-native-web/dist/index.js',
  // Adicionar shim para expo-linking
  'expo-linking': './shims/expo-linking-shim.js',
};

// Lista de módulos do Expo que podem precisar de shims
const expoModules = [
  'expo-linking',
  'expo-constants',
  'expo-asset',
  'expo-font',
  'expo-splash-screen',
];

// Mapeamento automático de módulos do Expo para seus shims
expoModules.forEach(module => {
  const shimPath = `./shims/${module.replace(/\//g, '-')}-shim.js`;
  if (fileExists(path.resolve(__dirname, shimPath))) {
    shimMapping[module] = shimPath;
  }
});

// Lista de helpers do Babel que frequentemente são necessários
const babelHelpers = [
  'interopRequireDefault',
  'interopRequireWildcard',
  'objectWithoutProperties',
  'extends',
  'objectSpread',
  'defineProperty',
  'asyncToGenerator',
  'classCallCheck',
  'createClass',
  'inherits',
  'possibleConstructorReturn',
  'getPrototypeOf',
  'slicedToArray',
  'toConsumableArray'
];

// Mapear automaticamente todos os helpers do Babel para seus respectivos shims
babelHelpers.forEach(helper => {
  const shimPath = path.resolve(__dirname, `shims/babel-helpers-${helper}.js`);
  if (fileExists(shimPath)) {
    shimMapping[`@babel/runtime/helpers/${helper}`] = `./shims/babel-helpers-${helper}.js`;
  }
});

// Adicionar os módulos principais ao mapeamento de resolução
const coreModules = {
  'react': path.resolve(__dirname, 'node_modules/react'),
  'react-native': path.resolve(__dirname, 'node_modules/react-native'),
  'react-native-web': path.resolve(__dirname, 'shims/react-native-web'),
  '@babel/runtime': path.resolve(__dirname, 'node_modules/@babel/runtime'),
  'expo-linking': path.resolve(__dirname, 'node_modules/expo-linking'),
};

// Fix module resolution issues
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  ...Object.entries(shimMapping).reduce((acc, [key, value]) => {
    acc[key] = path.resolve(__dirname, value);
    return acc;
  }, {}),
  ...coreModules
};

// Forçar resolução de determinados módulos
config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs', 'mjs'];
config.resolver.resolverMainFields = [
  'react-native',
  'browser',
  'main'
];

// Custom resolution for problematic modules
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Logs específicos para depuração de módulos problemáticos
  if (moduleName === 'react-native' || 
      moduleName === 'expo-linking' ||
      moduleName.includes('@babel/runtime/helpers') || 
      moduleName.includes('expo-router') ||
      moduleName.includes('@react-navigation/native')) {
    console.log('Tentando resolver:', moduleName);
    console.log('A partir de:', context.originModulePath);
  }

  // Caso especial para expo-linking
  if (moduleName === 'expo-linking') {
    // Primeiro tenta o módulo real
    try {
      const resolvedPath = require.resolve(moduleName, {
        paths: [path.dirname(context.originModulePath), process.cwd()]
      });
      console.log(`Encontrado expo-linking em: ${resolvedPath}`);
      return {
        filePath: resolvedPath,
        type: 'sourceFile',
      };
    } catch (e) {
      // Se falhar, usa o shim
      const shimPath = path.resolve(__dirname, 'shims/expo-linking-shim.js');
      console.log(`Redirecionando ${moduleName} para shim: ${shimPath}`);
      return {
        filePath: shimPath,
        type: 'sourceFile',
      };
    }
  }

  // Primeiro, verifica se é um módulo principal
  if (coreModules[moduleName]) {
    console.log(`Resolvendo módulo principal: ${moduleName} -> ${coreModules[moduleName]}`);
    return {
      filePath: coreModules[moduleName],
      type: 'sourceFile',
    };
  }

  // Caso especial para react-native
  if (moduleName === 'react-native') {
    try {
      const resolvedPath = path.resolve(__dirname, 'node_modules/react-native');
      console.log(`Resolvendo react-native para: ${resolvedPath}`);
      return {
        filePath: resolvedPath,
        type: 'sourceFile',
      };
    } catch (e) {
      console.error(`Erro ao resolver react-native: ${e.message}`);
    }
  }

  // Resolver especificamente os helpers do Babel
  if (moduleName.startsWith('@babel/runtime/helpers/')) {
    const helperName = moduleName.split('/').pop();
    const shimPath = path.resolve(__dirname, `shims/babel-helpers-${helperName}.js`);
    
    // Verificar se temos um shim para este helper
    if (fileExists(shimPath)) {
      console.log(`Usando shim para ${moduleName}: ${shimPath}`);
      return {
        filePath: shimPath,
        type: 'sourceFile',
      };
    }
    
    // Tentar resolver usando o caminho padrão no node_modules
    try {
      const resolvedPath = require.resolve(moduleName, {
        paths: [path.dirname(context.originModulePath), process.cwd()]
      });
      console.log(`Encontrado helper babel em: ${resolvedPath}`);
      return {
        filePath: resolvedPath,
        type: 'sourceFile',
      };
    } catch (e) {
      console.warn(`Não foi possível resolver ${moduleName}, usando fallback`);
    }
  }

  // Manipulação especial para padrões de caminho específicos que estão causando problemas
  if (moduleName.includes('shims/react-native-web-shim.js/dist')) {
    console.log(`Interceptando caminho mal-formado: ${moduleName}`);
    return {
      filePath: path.resolve(__dirname, 'shims/react-native-web/dist/index.js'),
      type: 'sourceFile',
    };
  }
  
  // Caso especial para react-native-web em qualquer formato de caminho
  if (moduleName === 'react-native-web' || 
      moduleName.startsWith('react-native-web/') ||
      moduleName.includes('/react-native-web/')) {
    // Capturar diferentes padrões de caminho
    const shimPath = path.resolve(__dirname, 'shims/react-native-web/dist/index.js');
    console.log(`Redirecionando ${moduleName} para ${shimPath}`);
    return {
      filePath: shimPath,
      type: 'sourceFile',
    };
  }
  
  // Lista de módulos de navegação a verificar
  const navModules = [
    '@react-navigation/native-stack',
    '@react-navigation/bottom-tabs',
    '@react-navigation/native'
  ];
  
  // Verificar módulos de navegação
  if (navModules.some(mod => moduleName.startsWith(mod))) {
    // Tentar encontrar o módulo instalado primeiro
    try {
      const resolvedPath = require.resolve(moduleName, {
        paths: [path.dirname(context.originModulePath), process.cwd()]
      });
      console.log(`Encontrado módulo instalado: ${resolvedPath}`);
      return {
        filePath: resolvedPath,
        type: 'sourceFile',
      };
    } catch (e) {
      // Se não encontrar o módulo instalado, usar o shim
      const moduleSuffix = moduleName.split('/')[0].split('@').pop();
      const shimPath = path.resolve(__dirname, `shims/${moduleSuffix}-shim.js`);
      if (fileExists(shimPath)) {
        console.log(`Usando shim para ${moduleName}: ${shimPath}`);
        return {
          filePath: shimPath,
          type: 'sourceFile',
        };
      }
    }
  }
  
  // Verificar shims diretos para outros módulos
  for (const [modulePattern, shimPath] of Object.entries(shimMapping)) {
    if (moduleName === modulePattern || moduleName.startsWith(modulePattern + '/')) {
      const resolvedPath = path.resolve(__dirname, shimPath);
      if (fileExists(resolvedPath)) {
        console.log(`Redirecionando ${moduleName} para ${resolvedPath}`);
        return {
          filePath: resolvedPath,
          type: 'sourceFile',
        };
      }
    }
  }
  
  // Let Metro handle everything else
  return context.resolveRequest(context, moduleName, platform);
};

// Additional configuration for web platform
if (process.env.EXPO_PLATFORM === 'web') {
  config.resolver.resolverMainFields = ['browser', 'main'];
  
  // Force evaluation of problematic modules in Metro rather than in the browser
  config.transformer.unstable_allowRequireContext = true;
}

// Prevent duplicate module errors
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
