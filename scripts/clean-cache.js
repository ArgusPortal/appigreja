/**
 * Script para limpar os diretórios de cache do Metro e Expo
 * Este script não depende do rimraf estar instalado globalmente
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');

console.log('🧹 Iniciando limpeza de cache...');

// Diretórios a serem limpos
const cacheDirs = [
  path.join(projectRoot, '.metro-cache'),
  path.join(projectRoot, 'node_modules/.cache'),
  path.join(projectRoot, '.expo')
];

/**
 * Remove um diretório recursivamente (semelhante a rm -rf)
 */
function removeDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return;
  }
  
  try {
    // Primeiro tenta usar rimraf via npx
    try {
      console.log(`Tentando remover ${dirPath} usando npx rimraf...`);
      execSync(`npx rimraf "${dirPath}"`, { stdio: 'inherit' });
      console.log(`✅ Diretório removido: ${dirPath}`);
      return;
    } catch (npxError) {
      console.log(`Não foi possível usar npx rimraf: ${npxError.message}`);
      console.log('Tentando método alternativo...');
    }
    
    // Método nativo do Node.js para remover diretórios recursivamente
    if (fs.rmSync) {
      // Node.js v14+
      fs.rmSync(dirPath, { recursive: true, force: true });
    } else {
      // Node.js versões mais antigas
      deleteFolderRecursive(dirPath);
    }
    console.log(`✅ Diretório removido: ${dirPath}`);
  } catch (e) {
    console.error(`❌ Erro ao remover diretório ${dirPath}: ${e.message}`);
  }
}

/**
 * Implementação recursiva para remover um diretório (para Node.js mais antigos)
 */
function deleteFolderRecursive(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

// Limpar cada diretório de cache
cacheDirs.forEach(dir => {
  console.log(`Limpando ${dir}...`);
  removeDir(dir);
});

console.log('\n✅ Todos os diretórios de cache foram limpos!');
console.log('\nAgora você pode iniciar o aplicativo com:');
console.log('node scripts/fix-metro-sha1.js && npm run android');
