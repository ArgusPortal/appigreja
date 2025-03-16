/**
 * Script para validar e corrigir a instalação do expo-router/entry
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');

console.log('🔍 Verificando instalação do expo-router...');

function checkFile(filePath, label) {
  try {
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`✅ ${label} encontrado: ${filePath} (${stats.size} bytes)`);
      return true;
    } else {
      console.error(`❌ ${label} não encontrado: ${filePath}`);
      return false;
    }
  } catch (e) {
    console.error(`❌ Erro ao verificar ${label}: ${e.message}`);
    return false;
  }
}

// Verificar arquivos cruciais
const expoRouterDir = path.join(projectRoot, 'node_modules/expo-router');
const expoRouterEntry = path.join(expoRouterDir, 'entry.js');
const expoRouterEntryClassic = path.join(expoRouterDir, 'entry-classic.js');
const localEntry = path.join(projectRoot, 'entry.js');

checkFile(expoRouterDir, 'Diretório expo-router');
checkFile(expoRouterEntry, 'expo-router/entry.js');
checkFile(expoRouterEntryClassic, 'expo-router/entry-classic.js');
checkFile(localEntry, 'Entrada local entry.js');

// Verificar se os módulos podem ser importados
try {
  console.log('\n📦 Tentando importar expo-router...');
  const expoRouter = require(expoRouterDir);
  console.log('✅ Importação de expo-router bem-sucedida');
} catch (e) {
  console.error(`❌ Erro ao importar expo-router: ${e.message}`);
}

try {
  console.log('\n📦 Tentando importar expo-router/entry...');
  const expoRouterEntryModule = require(expoRouterEntry);
  console.log('✅ Importação de expo-router/entry bem-sucedida');
} catch (e) {
  console.error(`❌ Erro ao importar expo-router/entry: ${e.message}`);
}

// Tentar corrigir o problema recriando os arquivos necessários
console.log('\n🔧 Tentando corrigir problemas...');

// Verificar se é necessário criar o arquivo entry.js local
if (!fs.existsSync(localEntry)) {
  console.log('Criando arquivo entry.js local...');
  fs.writeFileSync(localEntry, `/**
 * Arquivo de entrada personalizado que resolve o problema do Metro não encontrar o módulo expo-router/entry
 * Este arquivo serve como uma ponte para o módulo real
 */

// Redirecionando para o entry do expo-router
module.exports = require('expo-router/entry-classic');

// Importamos diretamente desta forma para garantir que o Metro possa resolver o módulo
require('expo-router');
`);
  console.log('✅ Arquivo entry.js criado com sucesso');
}

// Verificar se é necessário recriar o entry.js do expo-router
if (!fs.existsSync(expoRouterEntry) && fs.existsSync(expoRouterDir)) {
  console.log('Criando arquivo expo-router/entry.js...');
  fs.writeFileSync(expoRouterEntry, `// This is aliased to another location when server components are enabled.
// We use this intermediate file to avoid issues with aliases not applying to package.json main field resolution.
import 'expo-router/entry-classic';
`);
  console.log('✅ Arquivo expo-router/entry.js criado com sucesso');
}

console.log('\n✅ Verificação concluída!');
console.log('\nPróximos passos:');
console.log('1. Certifique-se de que o main no package.json está apontando para "./entry.js"');
console.log('2. Execute: npm run fix-metro-sha1');
console.log('3. Execute: npm run android-clean');
