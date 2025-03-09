/**
 * Script para verificar e corrigir problemas de resolução do react-native
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Verificando instalação do react-native...');

// Verificar se react-native está instalado
try {
  const reactNativePath = require.resolve('react-native/package.json');
  console.log('✅ react-native está instalado: ' + reactNativePath);
  
  // Mostrar versão do react-native
  const packageJson = require(reactNativePath);
  console.log(`Versão do react-native: ${packageJson.version}`);
} catch (e) {
  console.error('❌ react-native não está instalado corretamente!');
  console.log('Reinstalando react-native...');
  try {
    execSync('npm install react-native@0.76.7 --save-exact', { stdio: 'inherit' });
    console.log('✅ react-native reinstalado com sucesso!');
  } catch (err) {
    console.error('❌ Falha ao reinstalar react-native.');
  }
}

// Criar shim para react-native
const shimsDir = path.join(__dirname, '../shims');
const reactNativeShimPath = path.join(shimsDir, 'react-native-shim.js');

if (!fs.existsSync(shimsDir)) {
  fs.mkdirSync(shimsDir, { recursive: true });
}

if (!fs.existsSync(reactNativeShimPath)) {
  console.log('Criando shim para react-native...');
  fs.writeFileSync(reactNativeShimPath, `/**
 * Shim para react-native que redireciona para o módulo real
 * Este arquivo é usado quando o bundler não consegue resolver o módulo react-native
 */

// Tenta obter o módulo react-native real
let reactNative;

try {
  reactNative = require('../node_modules/react-native');
} catch (e) {
  console.error('Erro ao importar react-native:', e);
  
  // Implementação fallback mínima
  reactNative = {
    Platform: { OS: 'android', select: (obj) => obj.android || obj.default || {} },
    StyleSheet: {
      create: (styles) => styles,
      flatten: (style) => ({}),
    },
    View: () => null,
    Text: () => null,
    Image: () => null,
    TouchableOpacity: () => null,
    ScrollView: () => null,
  };
}

// Exportar o módulo
module.exports = reactNative;`);
  console.log('✅ Shim criado para react-native');
}

// Verificar nós simbólicos no node_modules
console.log('Verificando links simbólicos em node_modules...');

try {
  const nodeModulesPath = path.join(__dirname, '../node_modules');
  const reactNativeModulePath = path.join(nodeModulesPath, 'react-native');
  
  const stat = fs.lstatSync(reactNativeModulePath);
  if (stat.isSymbolicLink()) {
    console.log('react-native é um link simbólico. Substituindo por cópia física...');
    
    // Remover o link simbólico
    fs.unlinkSync(reactNativeModulePath);
    
    // Reinstalar o módulo
    execSync('npm install react-native@0.76.7 --save-exact', { stdio: 'inherit' });
    console.log('✅ react-native reinstalado com sucesso!');
  }
} catch (e) {
  // Ignora erros - provavelmente o caminho não existe ou não é um link simbólico
}

// Verificar problemas comuns de configuração do Metro
console.log('\nVerificando configuração do Metro...');

const metroConfigPath = path.join(__dirname, '../metro.config.js');
if (fs.existsSync(metroConfigPath)) {
  console.log('✅ metro.config.js encontrado');
  
  // Lê o arquivo de configuração
  const metroConfig = fs.readFileSync(metroConfigPath, 'utf8');
  
  // Verifica se há configuração para react-native
  if (!metroConfig.includes('react-native')) {
    console.warn('⚠️ metro.config.js pode não estar configurado corretamente para react-native');
    console.log('Por favor, verifique se o metro.config.js tem mapeamento explícito para react-native');
  } else {
    console.log('✅ metro.config.js parece estar configurado para react-native');
  }
}

console.log('\nVerificação concluída.');
console.log('\nSe você ainda tiver problemas com react-native, execute:');
console.log('npm run fix-react-native');
console.log('npm run android-deep-clean');
