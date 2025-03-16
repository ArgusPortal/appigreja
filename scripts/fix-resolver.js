/**
 * Script para diagnosticar e corrigir problemas de resolução de módulos no Metro
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const entryJsPath = path.join(projectRoot, 'entry.js');
const nodeModulesPath = path.join(projectRoot, 'node_modules');

console.log('🔍 Iniciando diagnóstico de resolução de módulos...');

// Verificar arquivo entry.js
console.log('\n📋 Verificando entry.js...');
if (fs.existsSync(entryJsPath)) {
  const stats = fs.statSync(entryJsPath);
  console.log(`✅ entry.js encontrado (${stats.size} bytes)`);
  
  // Exibir o conteúdo para debug
  const content = fs.readFileSync(entryJsPath, 'utf8');
  console.log('📄 Conteúdo do entry.js:');
  console.log('----------------------------------------');
  console.log(content);
  console.log('----------------------------------------');
} else {
  console.error('❌ entry.js não encontrado!');
  
  console.log('🔧 Criando novo entry.js...');
  const entryContent = `/**
 * Arquivo de entrada personalizado que serve como ponte para o expo-router
 * Criado por fix-resolver.js em ${new Date().toISOString()}
 */

// Redirecionando para o entry do expo-router
module.exports = require('expo-router/entry-classic');

// Importamos diretamente desta forma para garantir que o Metro possa resolver o módulo
require('expo-router');

// Hash único para garantir mudança no SHA-1: ${Date.now().toString(36)}
`;
  
  try {
    fs.writeFileSync(entryJsPath, entryContent, { mode: 0o666 });
    console.log('✅ entry.js criado com sucesso!');
  } catch (e) {
    console.error(`❌ Erro ao criar entry.js: ${e.message}`);
  }
}

// Verificar expo-router/entry
console.log('\n📋 Verificando expo-router/entry...');
const expoRouterPath = path.join(nodeModulesPath, 'expo-router');
const expoRouterEntryPath = path.join(expoRouterPath, 'entry.js');

if (fs.existsSync(expoRouterPath)) {
  console.log(`✅ Diretório expo-router encontrado: ${expoRouterPath}`);
  
  if (fs.existsSync(expoRouterEntryPath)) {
    console.log(`✅ expo-router/entry.js encontrado: ${expoRouterEntryPath}`);
    
    try {
      const content = fs.readFileSync(expoRouterEntryPath, 'utf8');
      console.log(`✅ Tamanho do arquivo: ${content.length} bytes`);
      console.log('📄 Primeiras linhas:');
      console.log(content.substring(0, 200) + '...');
    } catch (e) {
      console.error(`❌ Erro ao ler expo-router/entry.js: ${e.message}`);
    }
  } else {
    console.error('❌ expo-router/entry.js não encontrado!');
    
    // Verificar se expo-router/entry-classic.js existe
    const expoRouterEntryClassicPath = path.join(expoRouterPath, 'entry-classic.js');
    if (fs.existsSync(expoRouterEntryClassicPath)) {
      console.log(`✅ Encontrado expo-router/entry-classic.js: ${expoRouterEntryClassicPath}`);
      
      // Criar um link para entry.js
      console.log('🔧 Criando entry.js baseado em entry-classic.js...');
      const entryClassicContent = fs.readFileSync(expoRouterEntryClassicPath, 'utf8');
      try {
        fs.writeFileSync(expoRouterEntryPath, entryClassicContent);
        console.log('✅ expo-router/entry.js criado com sucesso!');
      } catch (e) {
        console.error(`❌ Erro ao criar expo-router/entry.js: ${e.message}`);
      }
    } else {
      console.error('❌ expo-router/entry-classic.js também não encontrado!');
    }
  }
} else {
  console.error('❌ Diretório expo-router não encontrado!');
}

// Verificar módulos críticos
console.log('\n📋 Verificando módulos críticos...');
const criticalModules = [
  'expo',
  'expo-linking',
  'expo-router',
  'react-native',
  '@babel/runtime'
];

for (const module of criticalModules) {
  const modulePath = path.join(nodeModulesPath, module);
  
  if (fs.existsSync(modulePath)) {
    const packageJsonPath = path.join(modulePath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      try {
        const packageJson = require(packageJsonPath);
        console.log(`✅ ${module} v${packageJson.version} encontrado`);
      } catch {
        console.log(`✅ ${module} encontrado (versão desconhecida)`);
      }
    } else {
      console.log(`⚠️ ${module} encontrado, mas sem package.json`);
    }
  } else {
    console.error(`❌ Módulo crítico não encontrado: ${module}`);
  }
}

// Adicionar diagnóstico específico do erro "Cannot read properties of undefined (reading 'type')"
console.log('\n🔍 Verificando possíveis causas do erro "Cannot read properties of undefined (reading \'type\')"...');

// Verificar se o metro.config.js tem implementação correta do resolveRequest
const metroConfigPath = path.join(projectRoot, 'metro.config.js');
if (fs.existsSync(metroConfigPath)) {
  const metroConfig = fs.readFileSync(metroConfigPath, 'utf8');
  
  // Verificar se o resolver retorna undefined em algum lugar
  if (metroConfig.includes('return undefined') || 
      metroConfig.match(/return\s+;/) ||
      metroConfig.includes('originalResolveRequest(context, moduleName, platform)')) {
    console.warn('⚠️ metro.config.js pode estar usando um padrão de resolução que causa o erro "Cannot read properties of undefined (reading \'type\')"');
    console.log('   Recomendação: Modifique o resolveRequest para retornar null em vez de undefined para usar o resolver padrão do Metro');
  }

  // Verificar se estamos usando o correto retorno para fallback
  if (!metroConfig.includes('return null')) {
    console.warn('⚠️ metro.config.js não está retornando null para fallbacks. Isto pode causar o erro "Cannot read properties of undefined (reading \'type\')"');
  } else {
    console.log('✅ metro.config.js está usando return null como fallback, o que é correto');
  }
}

// Verificar versão do Metro
try {
  const metroPackageJsonPath = path.join(nodeModulesPath, 'metro/package.json');
  if (fs.existsSync(metroPackageJsonPath)) {
    const metroPackage = require(metroPackageJsonPath);
    console.log(`📊 Versão do Metro: ${metroPackage.version}`);
    // Verificar se é uma versão conhecida por ter problemas
    if (metroPackage.version.startsWith('0.')) {
      console.warn(`⚠️ Versão do Metro ${metroPackage.version} pode ter problemas conhecidos de resolução. Considere atualizar.`);
    }
  } else {
    console.error('❌ Não foi possível encontrar o pacote do Metro');
  }
} catch (e) {
  console.error('❌ Erro ao verificar versão do Metro:', e.message);
}

// Exibir informações de diagnóstico
console.log('\n📋 Informações de diagnóstico:');
console.log(`📌 Node.js: ${process.version}`);
console.log(`📌 Sistema operacional: ${process.platform} ${process.arch}`);
console.log(`📌 Diretório do projeto: ${projectRoot}`);

console.log('\n✅ Diagnóstico concluído!');
console.log('\nPara resolver problemas de Metro, execute:');
console.log('1. npm run clean-cache');
console.log('2. node scripts/fix-entry-js.js');
console.log('3. npm run metro-fix');
console.log('4. npm run android-fixed');
