/**
 * Script especializado para solucionar problemas com o arquivo entry.js
 * e o erro SHA-1 no Metro Bundler
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const projectRoot = path.resolve(__dirname, '..');
const entryJsPath = path.join(projectRoot, 'entry.js');
const backupDir = path.join(projectRoot, '.backups');

// Criar diretório de backup se não existir
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

console.log('🔍 Iniciando reparação do entry.js...');

// Backup do entry.js original se existir
if (fs.existsSync(entryJsPath)) {
  try {
    const backupPath = path.join(backupDir, `entry-${Date.now()}.js.bak`);
    console.log(`📦 Criando backup em: ${backupPath}`);
    fs.copyFileSync(entryJsPath, backupPath);
    console.log('✅ Backup criado com sucesso');
  } catch (e) {
    console.error(`⚠️ Não foi possível criar backup: ${e.message}`);
  }
}

// Gerar conteúdo com timestamp para garantir hash diferente
const timestamp = new Date().toISOString();
const randomValue = Math.random().toString(36).substring(2);

const entryContent = `/**
 * Arquivo de entrada personalizado que serve como ponte para o expo-router
 * Gerado em: ${timestamp}
 * Hash aleatório: ${randomValue}
 */

// Redirecionando para o entry do expo-router
module.exports = require('expo-router/entry-classic');

// Importamos diretamente desta forma para garantir que o Metro possa resolver o módulo
require('expo-router');

// Valor aleatório para garantir hash único: ${crypto.randomBytes(8).toString('hex')}
`;

console.log('📝 Recriando arquivo entry.js...');

// Remover o arquivo existente se houver
if (fs.existsSync(entryJsPath)) {
  try {
    fs.unlinkSync(entryJsPath);
    console.log('✅ Arquivo entry.js anterior removido');
  } catch (e) {
    console.error(`⚠️ Erro ao remover entry.js: ${e.message}`);
  }
}

// Criar novo arquivo com permissões amplas
try {
  fs.writeFileSync(entryJsPath, entryContent, { mode: 0o666 });
  console.log('✅ Arquivo entry.js recriado com sucesso');
  
  // Calcular e exibir o SHA-1
  const content = fs.readFileSync(entryJsPath);
  const hash = crypto.createHash('sha1');
  hash.update(content);
  const sha1 = hash.digest('hex');
  console.log(`✅ SHA-1 do entry.js: ${sha1}`);
  
  // Verificar permissões
  const stats = fs.statSync(entryJsPath);
  console.log(`📊 Permissões: ${stats.mode.toString(8)}`);
  console.log(`📊 Tamanho: ${stats.size} bytes`);
} catch (e) {
  console.error(`❌ Erro ao recriar entry.js: ${e.message}`);
}

// Criar cópias adicionais em locais estratégicos
const additionalLocations = [
  path.join(projectRoot, 'shims/entry.js'),
  path.join(projectRoot, 'app/entry.js')
];

for (const location of additionalLocations) {
  try {
    // Garantir que o diretório existe
    const dir = path.dirname(location);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Criar cópia
    fs.writeFileSync(location, entryContent, { mode: 0o666 });
    console.log(`✅ Cópia adicional criada em: ${location}`);
  } catch (e) {
    console.error(`⚠️ Não foi possível criar cópia em ${location}: ${e.message}`);
  }
}

console.log('\n✅ Processo concluído! O arquivo entry.js foi recriado.');
console.log('\nPróximos passos:');
console.log('1. Limpe o cache: npm run clean-cache');
console.log('2. Inicie o app: npm run android-clean');
