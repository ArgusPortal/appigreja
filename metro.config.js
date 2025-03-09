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
  '@react-navigation/native-stack': './shims/native-stack-shim.js',
  '@react-navigation/bottom-tabs': './shims/bottom-tabs-shim.js',
  'react-native-web': './shims/react-native-web/dist/index.js',
  'react-native-web/dist/index': './shims/react-native-web/dist/index.js',
  'react-native-web/dist': './shims/react-native-web/dist/index.js',
};

// Fix module resolution issues
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  ...Object.entries(shimMapping).reduce((acc, [key, value]) => {
    acc[key] = path.resolve(__dirname, value);
    return acc;
  }, {}),
  'react': path.resolve(__dirname, 'node_modules/react'),
  'react-native-web': path.resolve(__dirname, 'shims/react-native-web'),
};

// Custom resolution for problematic modules
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Log para debugging específico de módulos problemáticos
  if (moduleName.includes('expo-router/node/render') || 
      moduleName.includes('@react-navigation/native') ||
      moduleName.includes('react-native-web')) {
    console.log('Tentando resolver:', moduleName);
    console.log('A partir de:', context.originModulePath);
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
  
  // Caso especial para 'expo-router/node/render'
  if (moduleName === 'expo-router/node/render' || 
      moduleName === 'expo-router/node/render.js') {
    // Priorizar nosso shim personalizado
    const shimPath = path.resolve(__dirname, 'shims/router-render-shim.js');
    if (fileExists(shimPath)) {
      console.log(`Redirecionando ${moduleName} para ${shimPath}`);
      return {
        filePath: shimPath,
        type: 'sourceFile',
      };
    }
    
    // Tentar outros caminhos possíveis se o shim não existir
    const possiblePaths = [
      path.resolve(__dirname, 'node_modules/expo-router/build/node/render.js'),
      path.resolve(__dirname, 'node_modules/expo-router/build/node/render/index.js'),
    ];
    
    for (const tryPath of possiblePaths) {
      if (fileExists(tryPath)) {
        console.log(`Encontrado expo-router/node/render em: ${tryPath}`);
        return {
          filePath: tryPath,
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
  
  // Assegurar que 'react' resolve para o correto quando importado de shims
  if (moduleName === 'react' && context.originModulePath.includes('shims')) {
    return {
      filePath: path.resolve(__dirname, 'shims/react-shim.js'),
      type: 'sourceFile',
    };
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
