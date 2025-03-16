/**
 * Script Utilitário para resolver todos os problemas comuns do Android
 * Este arquivo pode ser executado diretamente: node fix-android-all.js
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🛠️  Ferramenta de Reparo Total para Android');
console.log('===========================================');

// Verificar se estamos no diretório correto
const packageJsonPath = path.join(__dirname, 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ Erro: Este script deve ser executado no diretório raiz do projeto.');
  process.exit(1);
}

const runCommand = (command, label) => {
  console.log(`\n🔄 ${label}...`);
  try {
    execSync(command, { stdio: 'inherit', cwd: __dirname });
    console.log(`✅ ${label} concluído com sucesso!`);
    return true;
  } catch (e) {
    console.error(`❌ Erro durante ${label}: ${e.message}`);
    return false;
  }
};

// Passos de reparo em sequência
console.log('\n🧹 Iniciando processo de reparo completo...');

// 1. Limpar caches
runCommand('rimraf .metro-cache node_modules/.cache .expo', 'Limpando caches');

// 2. Verificar e corrigir dependências babel
runCommand('node scripts/check-babel-deps.js', 'Verificando dependências Babel');

// 3. Verificar e corrigir dependências Expo
if (fs.existsSync(path.join(__dirname, 'scripts/check-expo-deps.js'))) {
  runCommand('node scripts/check-expo-deps.js', 'Verificando dependências Expo');
} else {
  console.log('\n⚠️ Script de verificação Expo não encontrado, pulando esta etapa');
}

// 4. Verificar e corrigir problemas com Metro SHA-1
if (fs.existsSync(path.join(__dirname, 'scripts/fix-metro-sha1.js'))) {
  runCommand('node scripts/fix-metro-sha1.js', 'Corrigindo problemas Metro SHA-1');
} else {
  console.log('\n⚠️ Script de reparo Metro SHA-1 não encontrado, pulando esta etapa');
}

// 5. Verificar e corrigir React Native
runCommand('node scripts/fix-react-native.js', 'Verificando React Native');

// 6. Reinstalar módulos problemáticos
console.log('\n🔄 Reinstalando módulos problemáticos...');
try {
  // Verificar e modificar o arquivo package.json para garantir versões exatas
  const packageJson = require(packageJsonPath);
  const dependencies = packageJson.dependencies || {};
  
  // Fixar versões exatas para alguns pacotes problemáticos
  if (dependencies['expo-linking']) dependencies['expo-linking'] = '7.0.5';
  if (dependencies['react-native']) dependencies['react-native'] = '0.76.7';
  
  // Salvar mudanças
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ Versões problemáticas fixadas em package.json');
  
  // Reinstalar módulos específicos
  runCommand('npm install expo-linking@7.0.5 --save-exact', 'Reinstalando expo-linking');
  runCommand('npm install react-native@0.76.7 --save-exact', 'Reinstalando react-native');
  
} catch (e) {
  console.error(`❌ Erro ao modificar package.json: ${e.message}`);
}

// 7. Iniciar a aplicação
if (runCommand('npm run android-clean', 'Iniciando aplicação Android')) {
  console.log('\n🎉 Todos os reparos foram concluídos e a aplicação foi iniciada!');
} else {
  console.log('\n⚠️ Todos os reparos foram aplicados, mas houve um problema ao iniciar a aplicação.');
  console.log('Tente executar o comando manualmente: npm run android');
}
