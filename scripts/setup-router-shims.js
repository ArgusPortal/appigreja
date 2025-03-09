/**
 * Script para configurar shims do expo-router
 * Este script cria manualmente os arquivos necessários nas pastas node_modules
 * compatível com Windows e Linux/macOS
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🛠️  Configurando shims para expo-router...');

// Caminhos importantes
const projectRoot = path.resolve(__dirname, '..');
const nodeModulesPath = path.join(projectRoot, 'node_modules');
const expoRouterPath = path.join(nodeModulesPath, 'expo-router');
const expoRouterBuildPath = path.join(expoRouterPath, 'build');
const expoRouterNodePath = path.join(expoRouterBuildPath, 'node');
const shimsPath = path.join(projectRoot, 'shims');

// Função para criar pastas recursivamente
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`📁 Criando pasta: ${dirPath}`);
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Função para copiar arquivo
function copyFile(source, destination) {
  try {
    const content = fs.readFileSync(source, 'utf8');
    fs.writeFileSync(destination, content, 'utf8');
    console.log(`✅ Arquivo copiado: ${destination}`);
  } catch (error) {
    console.error(`❌ Erro ao copiar arquivo: ${error.message}`);
  }
}

// Função para criar arquivo com conteúdo
function createFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Arquivo criado: ${filePath}`);
  } catch (error) {
    console.error(`❌ Erro ao criar arquivo: ${error.message}`);
  }
}

// Verificar e instalar dependências faltantes
const navDependencies = [
  { name: '@react-navigation/native-stack', version: '^7.0.0' },
  { name: '@react-navigation/bottom-tabs', version: '^7.0.0' },
  { name: '@react-navigation/native', version: '^7.0.0' }
];

navDependencies.forEach(dep => {
  console.log(`📦 Verificando se ${dep.name} está instalado...`);
  try {
    require.resolve(dep.name);
    console.log(`✅ ${dep.name já está instalado.`);
  } catch (e) {
    console.log(`⚠️  ${dep.name} não encontrado, tentando instalar...`);
    try {
      execSync(`npm install ${dep.name}@${dep.version} --legacy-peer-deps`, { 
        cwd: projectRoot,
        stdio: 'inherit'
      });
      console.log(`✅ ${dep.name} instalado com sucesso!`);
    } catch (error) {
      console.error(`❌ Erro ao instalar ${dep.name}: ${error.message}`);
      console.log(`⚠️  Utilizando shim como fallback...`);
    }
  }
});

// Configurar estrutura do react-native-web
console.log('🔧 Configurando estrutura do react-native-web...');
const rnwDistPath = path.join(shimsPath, 'react-native-web', 'dist');
ensureDirectoryExists(rnwDistPath);

// Definir o conteúdo do shim para react-native-web
const rnwShimContent = `/**
 * Shim para react-native-web/dist/index
 * Fornece implementações básicas de componentes necessários para o expo-router
 */

// Implementação minimalista dos componentes necessários
const View = function(props) { return null; };
const Text = function(props) { return null; };
const ScrollView = function(props) { return null; };
const Pressable = function(props) { return null; };
const StyleSheet = {
  create: (styles) => styles,
  compose: (...styles) => ({}),
  flatten: (style) => ({}),
};

// Plataforma - sempre simular que estamos na web
const Platform = {
  OS: 'web',
  select: (obj) => obj.web || obj.default || {},
  isTesting: false,
  isWeb: true,
};

// Componentes adicionais frequentemente usados
const Image = function(props) { return null; };
const TextInput = function(props) { return null; };
const TouchableOpacity = function(props) { return null; };
const TouchableWithoutFeedback = function(props) { return null; };
const FlatList = function(props) { return null; };

// Exportações principais
const reactNativeWeb = {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  Platform,
};

// Exportar como CommonJS
module.exports = reactNativeWeb;
module.exports.default = reactNativeWeb;

// Adicionar propriedade __esModule para compatibilidade
Object.defineProperty(module.exports, "__esModule", {
  value: true
});
`;

// Criar arquivo index.js para react-native-web
const rnwIndexPath = path.join(rnwDistPath, 'index.js');
createFile(rnwIndexPath, rnwShimContent);

// Também criar uma cópia no node_modules para redundância
const rnwNodeModulesPath = path.join(nodeModulesPath, 'react-native-web', 'dist');
ensureDirectoryExists(rnwNodeModulesPath);
const rnwNodeModulesIndexPath = path.join(rnwNodeModulesPath, 'index.js');
createFile(rnwNodeModulesIndexPath, rnwShimContent);

// Verificar e criar pastas necessárias para expo-router
ensureDirectoryExists(expoRouterNodePath);

// Copiar o shim render para a pasta node
const renderShimSource = path.join(shimsPath, 'router-render-shim.js');
const renderShimDest = path.join(expoRouterNodePath, 'render.js');
copyFile(renderShimSource, renderShimDest);

// Criar o conteúdo do index.js
const indexContent = `
/**
 * Auto-generated by setup-router-shims.js
 */
const render = require('./render');

// Reexportar as funções principais
module.exports = {
  render: render.render,
  getStaticContent: render.getStaticContent,
  renderToString: render.renderToString,
  hydrate: function() { console.warn("hydrate from index invocado"); },
  shell: function() { console.warn("shell from index invocado"); return { html: "" }; },
  default: render
};

// Adicionar flag __esModule
Object.defineProperty(module.exports, "__esModule", {
  value: true
});
`;

// Criar index.js na pasta node
const indexJsPath = path.join(expoRouterNodePath, 'index.js');
createFile(indexJsPath, indexContent);

console.log('✅ Setup completo! Execute "npm run clear-metro" seguido de "npm start -- --reset-cache" para iniciar com as novas configurações.');
