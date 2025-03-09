/**
 * Script para verificar dependências do Expo
 * Este script identifica módulos Expo que podem estar causando problemas e cria shims para eles
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Lista de módulos Expo frequentemente problemáticos
const commonExpoModules = [
  'expo-linking',
  'expo-constants',
  'expo-router',
  'expo-asset',
  'expo-font',
  'expo-splash-screen',
  'expo-status-bar',
  'expo-system-ui'
];

const shimsDir = path.join(__dirname, '../shims');

// Garantir que o diretório de shims exista
if (!fs.existsSync(shimsDir)) {
  fs.mkdirSync(shimsDir, { recursive: true });
}

// Verificar cada módulo do Expo
commonExpoModules.forEach(moduleName => {
  try {
    const modulePath = require.resolve(`${moduleName}/package.json`);
    console.log(`✅ ${moduleName} está instalado: ${modulePath}`);
    
    // Verificar se o módulo está acessível
    try {
      require(moduleName);
      console.log(`✅ ${moduleName} pode ser importado corretamente`);
    } catch (e) {
      console.warn(`⚠️ ${moduleName} está instalado, mas não pode ser importado: ${e.message}`);
      createShimForModule(moduleName);
    }
  } catch (e) {
    console.error(`❌ ${moduleName} não está instalado corretamente!`);
    console.log(`Tentando reinstalar ${moduleName}...`);
    
    try {
      execSync(`npm install ${moduleName}`, { stdio: 'inherit' });
      console.log(`✅ ${moduleName} reinstalado com sucesso!`);
    } catch (err) {
      console.error(`❌ Falha ao reinstalar ${moduleName}.`);
      createShimForModule(moduleName);
    }
  }
});

// Verificar especificamente o expo-linking que está causando problemas
const moduleName = 'expo-linking';
console.log(`\nVerificando especificamente o módulo ${moduleName}`);

// Criar o shim para expo-linking independente do resultado da verificação
createShimForModule(moduleName);

// Função para criar shim para um módulo
function createShimForModule(moduleName) {
  const shimPath = path.join(shimsDir, `${moduleName.replace(/\//g, '-')}-shim.js`);
  
  if (!fs.existsSync(shimPath)) {
    console.log(`Criando shim para ${moduleName}...`);
    
    let shimCode = `/**
 * Shim para ${moduleName}
 * Este arquivo fornece uma implementação simplificada quando o módulo real não pode ser resolvido.
 */

// Implementação simplificada
const ${toCamelCase(moduleName)} = {\n`;

    // Adicionar código específico para cada módulo
    if (moduleName === 'expo-linking') {
      shimCode += `  createURL(path) {
    // Implementação básica para criar URLs
    const scheme = 'appigreja://';
    return scheme + path;
  },
  
  parse(url) {
    // Implementação básica para analisar URLs
    try {
      return new URL(url);
    } catch (e) {
      return { path: url };
    }
  },
  
  // Outros métodos comumente usados
  openURL: async (url) => {
    console.log('${moduleName}.openURL (shim):', url);
    return true;
  },
  
  canOpenURL: async (url) => {
    console.log('${moduleName}.canOpenURL (shim):', url);
    return true;
  },
  
  getInitialURL: async () => {
    return null;
  },
  
  addEventListener: (type, handler) => {
    console.log('${moduleName}.addEventListener (shim):', type);
    return {
      remove: () => {
        console.log('Removed event listener for', type);
      }
    };
  },
  
  removeEventListener: (type, handler) => {
    console.log('${moduleName}.removeEventListener (shim):', type);
  }`;
    } else if (moduleName === 'expo-constants') {
      shimCode += `  expoConfig: {
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
  })`;
    } else {
      // Shim genérico para outros módulos
      shimCode += `  // Implementação básica de fallback
  isAvailable: true,
  
  // Expor um objeto genérico
  default: {},
  
  // Método padrão para evitar erros
  get: (key) => {
    console.log('${moduleName}.get (shim):', key);
    return null;
  },
  
  // Método padrão para registros
  log: (message) => {
    console.log('${moduleName}.log (shim):', message);
  }`;
    }
    
    shimCode += `\n};\n\nmodule.exports = ${toCamelCase(moduleName)};\n`;
    
    fs.writeFileSync(shimPath, shimCode);
    console.log(`✅ Shim criado para ${moduleName} em ${shimPath}`);
  }
}

// Converter nome do módulo para camelCase
function toCamelCase(str) {
  return str
    .replace(/[^\w-]/g, '')  // Remover caracteres inválidos
    .replace(/^(\w)/, (c) => c.toUpperCase()) // Primeira letra maiúscula
    .replace(/-(\w)/g, (_, c) => c.toUpperCase()); // Converter kebab-case para camelCase
}

console.log('\nVerificação de dependências do Expo concluída.');
console.log('\nSe você continuar tendo problemas com módulos Expo, execute:');
console.log('npm run fix-expo-deps');
console.log('npm run android-deep-clean');
