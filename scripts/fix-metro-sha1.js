/**
 * Script para resolver problemas de SHA-1 com o Metro bundler
 * Este script verifica e repara a instalação do React Native
 * especificamente para problemas de cálculo de SHA-1
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const crypto = require('crypto');

const projectRoot = path.resolve(__dirname, '..');
const nodeModulesPath = path.join(projectRoot, 'node_modules');
const reactNativePath = path.join(nodeModulesPath, 'react-native');
const metroPath = path.join(nodeModulesPath, 'metro');
const tempBackupDir = path.join(projectRoot, '.temp-backup');

console.log('📋 Iniciando verificação e reparo de problemas de SHA-1 do Metro bundler');

// Função auxiliar para remover diretórios recursivamente
function removeDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return;
  }
  
  try {
    // Primeiro tenta usar rimraf via npx
    try {
      console.log(`Tentando remover ${dirPath} usando npx rimraf...`);
      execSync(`npx rimraf "${dirPath}"`, { stdio: 'inherit' });
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
  } catch (e) {
    console.error(`❌ Erro ao remover diretório ${dirPath}: ${e.message}`);
  }
}

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

// Verificar se os diretórios existem
console.log('\n🔍 Verificando diretórios necessários...');

const checkDirectory = (dirPath, name) => {
  try {
    const stats = fs.statSync(dirPath);
    if (!stats.isDirectory()) {
      console.error(`❌ ${name} existe mas não é um diretório: ${dirPath}`);
      return false;
    }
    console.log(`✅ ${name} encontrado: ${dirPath}`);
    return true;
  } catch (e) {
    console.error(`❌ ${name} não encontrado: ${dirPath}`);
    return false;
  }
};

const nodeModulesExists = checkDirectory(nodeModulesPath, 'node_modules');
const reactNativeExists = checkDirectory(reactNativePath, 'react-native');
const metroExists = checkDirectory(metroPath, 'metro');

// Verificar permissões dos diretórios
console.log('\n🔍 Verificando permissões...');

const checkPermissions = (dirPath) => {
  try {
    const testFilePath = path.join(dirPath, '.permission-test');
    fs.writeFileSync(testFilePath, 'test');
    fs.unlinkSync(testFilePath);
    console.log(`✅ Permissões de escrita OK para: ${dirPath}`);
    return true;
  } catch (e) {
    console.error(`❌ Problema de permissões para: ${dirPath}`);
    console.error(`  Erro: ${e.message}`);
    return false;
  }
};

if (reactNativeExists) checkPermissions(reactNativePath);
if (metroExists) checkPermissions(metroPath);

// Calcular o SHA-1 manualmente para testar
console.log('\n🔍 Testando cálculo de SHA-1 manualmente...');

const calculateSha1 = (filepath) => {
  try {
    if (!fs.existsSync(filepath)) {
      console.error(`❌ Arquivo não encontrado: ${filepath}`);
      return null;
    }
    
    const content = fs.readFileSync(filepath);
    const hash = crypto.createHash('sha1');
    hash.update(content);
    const sha1 = hash.digest('hex');
    console.log(`✅ SHA-1 para ${filepath}: ${sha1}`);
    return sha1;
  } catch (e) {
    console.error(`❌ Erro ao calcular SHA-1 para ${filepath}`);
    console.error(`  Erro: ${e.message}`);
    return null;
  }
};

// Testar um arquivo importante do React Native
if (reactNativeExists) {
  calculateSha1(path.join(reactNativePath, 'package.json'));
  calculateSha1(path.join(reactNativePath, 'index.js'));
}

// Backup e reinstalação do React Native
console.log('\n🔧 Preparando para reinstalar o React Native...');

// Criar diretório de backup temporário
if (!fs.existsSync(tempBackupDir)) {
  fs.mkdirSync(tempBackupDir, { recursive: true });
}

// Backup do package.json
const packageJsonPath = path.join(projectRoot, 'package.json');
const backupPackageJsonPath = path.join(tempBackupDir, 'package.json.backup');

console.log('📦 Fazendo backup do package.json...');
fs.copyFileSync(packageJsonPath, backupPackageJsonPath);

// Reinstalar React Native
console.log('\n🔄 Removendo e reinstalando React Native...');

try {
  console.log('📦 Removendo node_modules/react-native...');
  removeDir(path.join(nodeModulesPath, 'react-native'));
  
  console.log('📦 Reinstalando o React Native...');
  execSync('npm install react-native@0.76.7 --save-exact', { stdio: 'inherit', cwd: projectRoot });
  
  console.log('✅ React Native reinstalado com sucesso!');
} catch (e) {
  console.error(`❌ Erro ao reinstalar o React Native: ${e.message}`);
  
  // Restaurar o package.json do backup em caso de erro
  console.log('🔄 Restaurando package.json do backup...');
  fs.copyFileSync(backupPackageJsonPath, packageJsonPath);
}

// Limpar cache do Metro
console.log('\n🧹 Limpando cache do Metro...');

try {
  const cacheDirectories = [
    path.join(projectRoot, '.metro-cache'),
    path.join(projectRoot, 'node_modules/.cache'),
    path.join(projectRoot, '.expo')
  ];
  
  cacheDirectories.forEach(dir => {
    console.log(`Limpando ${dir}...`);
    removeDir(dir);
  });
  
  console.log('✅ Cache do Metro limpo com sucesso!');
} catch (e) {
  console.error(`❌ Erro ao limpar o cache do Metro: ${e.message}`);
}

// Verificar e corrigir permissões no Windows (problemas comuns com WSL)
if (process.platform === 'win32') {
  console.log('\n🔧 Verificando e corrigindo permissões no Windows...');
  
  // Método alternativo para corrigir permissões no Windows que não depende de icacls
  try {
    // Definir permissões usando métodos Node.js em vez de icacls
    console.log('Tentando definir permissões usando métodos Node.js...');
    
    // Função para tornar um arquivo ou diretório gravável
    const makeWritable = (filePath) => {
      try {
        if (fs.existsSync(filePath)) {
          const stats = fs.statSync(filePath);
          // 0o666 - permissão de leitura/escrita para todos
          const newMode = stats.mode | 0o666;
          fs.chmodSync(filePath, newMode);
          return true;
        }
        return false;
      } catch (e) {
        console.log(`Não foi possível alterar as permissões de ${filePath}`);
        return false;
      }
    };
    
    // Tentar tornar gravável o diretório react-native e seus arquivos
    if (reactNativeExists) {
      makeWritable(reactNativePath);
      
      // Verificar alguns arquivos importantes
      const keysFiles = [
        'package.json', 
        'index.js', 
        'Libraries/Core/ReactNativeVersion.js'
      ];
      
      keysFiles.forEach(file => {
        const filePath = path.join(reactNativePath, file);
        if (fs.existsSync(filePath)) {
          makeWritable(filePath);
        }
      });
      
      console.log('✅ Permissões ajustadas para React Native usando métodos Node.js');
    }
  } catch (e) {
    console.error(`❌ Erro ao corrigir permissões: ${e.message}`);
    console.log('Continuando mesmo com erro de permissões...');
  }
}

// Verificar integridade do projeto
console.log('\n🔍 Verificando integridade do projeto...');

try {
  execSync('npm audit fix', { stdio: 'inherit', cwd: projectRoot });
  console.log('✅ Auditoria de pacotes concluída!');
} catch (e) {
  console.error(`⚠️ Aviso na auditoria de pacotes: ${e.message}`);
}

// Criar ou atualizar o arquivo watchman
console.log('\n🔧 Configurando Watchman...');

const watchmanConfigPath = path.join(projectRoot, '.watchmanconfig');
const watchmanConfig = JSON.stringify({
  "ignore_dirs": [
    ".git",
    "node_modules/react-native/node_modules"
  ],
  "fsevents_latency": 0.05,
  "root_files": true
}, null, 2);

fs.writeFileSync(watchmanConfigPath, watchmanConfig);
console.log('✅ Arquivo .watchmanconfig atualizado!');

// Verificar e corrigir o arquivo entry.js
console.log('\n🔍 Verificando arquivo entry.js...');
const entryJsPath = path.join(projectRoot, 'entry.js');

// Forçar recriação do entry.js para garantir que ele esteja correto
console.log('⚠️ Recriando arquivo entry.js para garantir SHA-1 correto...');
const entryContent = `/**
 * Arquivo de entrada personalizado que serve como ponte para o expo-router
 * Criado em: ${new Date().toISOString()}
 */

// Redirecionando para o entry do expo-router
module.exports = require('expo-router/entry-classic');

// Importamos diretamente desta forma para garantir que o Metro possa resolver o módulo
require('expo-router');
`;

try {
  // Remover se existir para evitar problemas de permissão
  if (fs.existsSync(entryJsPath)) {
    fs.unlinkSync(entryJsPath);
    console.log('Arquivo entry.js existente removido');
  }
  
  // Criar novo arquivo
  fs.writeFileSync(entryJsPath, entryContent, { mode: 0o666 }); // Permissão explícita
  console.log('✅ Arquivo entry.js recriado com sucesso!');
  
  // Verificar se o arquivo foi criado corretamente
  if (fs.existsSync(entryJsPath)) {
    const stats = fs.statSync(entryJsPath);
    const content = fs.readFileSync(entryJsPath, 'utf8');
    console.log(`✅ Arquivo entry.js verificado: ${stats.size} bytes`);
    console.log(`Primeiros 50 caracteres: ${content.substring(0, 50)}...`);
    
    // Calcular o SHA-1 manualmente
    const hash = crypto.createHash('sha1');
    hash.update(content);
    const sha1 = hash.digest('hex');
    console.log(`✅ SHA-1 do entry.js: ${sha1}`);
  } else {
    console.error('❌ Falha ao verificar a criação do entry.js');
  }
} catch (e) {
  console.error(`❌ Erro ao recriar entry.js: ${e.message}`);
  console.error('Detalhes:', e);
}

// Criar uma cópia de backup do entry.js no diretório de shims para garantir
const shimsDir = path.join(projectRoot, 'shims');
if (!fs.existsSync(shimsDir)) {
  fs.mkdirSync(shimsDir, { recursive: true });
}

try {
  const entryBackupPath = path.join(shimsDir, 'entry-backup.js');
  fs.copyFileSync(entryJsPath, entryBackupPath);
  console.log(`✅ Cópia de backup criada em ${entryBackupPath}`);
} catch (e) {
  console.error(`❌ Não foi possível criar backup do entry.js: ${e.message}`);
}

// Verificar o package.json para garantir que main aponta para o arquivo correto
if (fs.existsSync(packageJsonPath)) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    if (packageJson.main !== 'expo-router/entry') {
      console.log(`⚠️ O main no package.json está configurado como "${packageJson.main}", corrigindo...`);
      packageJson.main = 'expo-router/entry';
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('✅ package.json atualizado!');
    } else {
      console.log('✅ O main no package.json está configurado corretamente!');
    }
  } catch (e) {
    console.error(`❌ Erro ao verificar package.json: ${e.message}`);
  }
}

console.log('\n✅ Verificação e reparo concluídos!');
console.log('\nPara executar o projeto Android, agora você pode usar:');
console.log('npm run clean-cache && npm run android');
