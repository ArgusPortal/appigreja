/**
 * Script para reiniciar completamente o ambiente de desenvolvimento
 * Limpa caches, arquivos temporários e força a recriação de tudo
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');

console.log('🔄 Iniciando reset completo do ambiente...');

// Funções auxiliares
function deleteIfExists(filePath, label) {
  try {
    if (fs.existsSync(filePath)) {
      if (fs.lstatSync(filePath).isDirectory()) {
        fs.rmSync(filePath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(filePath);
      }
      console.log(`✅ ${label || filePath} removido com sucesso`);
    }
  } catch (e) {
    console.error(`❌ Erro ao remover ${label || filePath}:`, e.message);
  }
}

function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit', cwd: projectRoot });
    return true;
  } catch (e) {
    console.error(`❌ Erro ao executar "${command}":`, e.message);
    return false;
  }
}

// Limpar todos os arquivos de cache
console.log('\n🧹 Limpando caches e arquivos temporários...');
deleteIfExists(path.join(projectRoot, '.expo'), 'Pasta .expo');
deleteIfExists(path.join(projectRoot, '.metro-cache'), 'Pasta .metro-cache');
deleteIfExists(path.join(projectRoot, 'node_modules/.cache'), 'Cache de módulos');

// Remover o arquivo entry.js da raiz que está causando problemas
deleteIfExists(path.join(projectRoot, 'entry.js'), 'Arquivo entry.js');

// Verificar e restaurar package.json se necessário
console.log('\n🔍 Verificando package.json...');
const packageJsonPath = path.join(projectRoot, 'package.json');
const packageJson = require(packageJsonPath);

if (packageJson.main !== 'expo-router/entry') {
  console.log('🔧 Corrigindo o ponto de entrada no package.json...');
  packageJson.main = 'expo-router/entry';
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ package.json atualizado com sucesso');
}

// Verificar e reinstalar expo-router se necessário
console.log('\n📦 Verificando instalação do expo-router...');
try {
  const expoRouterPkg = require(path.join(projectRoot, 'node_modules/expo-router/package.json'));
  console.log(`✅ expo-router instalado (versão ${expoRouterPkg.version})`);
} catch (e) {
  console.warn('⚠️ Problema com a instalação do expo-router, reinstalando...');
  runCommand('npm install expo-router@4.0.0 --save-exact');
}

// Remover a pasta node_modules/expo-router/.cache se existir
deleteIfExists(path.join(projectRoot, 'node_modules/expo-router/.cache'), 'Cache do expo-router');

// Reiniciar o Metro bundler com cache limpo
console.log('\n🔄 Reiniciando aplicação...');
console.log('Execução completa 🎉 - Agora você pode iniciar o app com:');
console.log('npm run android-clean');
