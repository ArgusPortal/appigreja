/**
 * Script para verificar dependências do Babel
 * Este script identifica os helpers do Babel que estão faltando e cria shims para eles
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Lista de helpers do Babel que frequentemente são necessários
const commonBabelHelpers = [
  'interopRequireDefault',
  'interopRequireWildcard',
  'objectWithoutProperties',
  'extends',
  'objectSpread',
  'defineProperty',
  'asyncToGenerator',
  'classCallCheck',
  'createClass',
  'inherits',
  'possibleConstructorReturn',
  'getPrototypeOf',
  'slicedToArray',
  'toConsumableArray'
];

const shimsDir = path.join(__dirname, '../shims');

// Garantir que o diretório de shims exista
if (!fs.existsSync(shimsDir)) {
  fs.mkdirSync(shimsDir, { recursive: true });
}

// Verificar se @babel/runtime está instalado
try {
  const babelRuntimePath = require.resolve('@babel/runtime/package.json');
  console.log('✅ @babel/runtime está instalado: ' + babelRuntimePath);
} catch (e) {
  console.error('❌ @babel/runtime não está instalado corretamente!');
  console.log('Instalando @babel/runtime...');
  try {
    execSync('npm install @babel/runtime', { stdio: 'inherit' });
    console.log('✅ @babel/runtime instalado com sucesso!');
  } catch (err) {
    console.error('❌ Falha ao instalar @babel/runtime. Execute npm install @babel/runtime manualmente.');
  }
}

// Criar shim para objectWithoutProperties
const objectWithoutPropertiesPath = path.join(shimsDir, 'babel-helpers-objectWithoutProperties.js');
if (!fs.existsSync(objectWithoutPropertiesPath)) {
  console.log('Criando shim para objectWithoutProperties...');
  fs.writeFileSync(objectWithoutPropertiesPath, `/**
 * Implementação de objectWithoutProperties para resolver erro de importação
 * em expo-router/build/link/Link.js
 */
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  
  var target = _objectWithoutPropertiesLoose(source, excluded);
  
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  
  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  
  return target;
}

module.exports = _objectWithoutProperties;`);
  console.log('✅ Shim criado para objectWithoutProperties');
}

// Verificar se existe shim para interopRequireDefault
const interopRequireDefaultPath = path.join(shimsDir, 'babel-runtime-shim.js');
if (!fs.existsSync(interopRequireDefaultPath)) {
  console.log('Criando shim para interopRequireDefault...');
  fs.writeFileSync(interopRequireDefaultPath, `/**
 * Implementação de interopRequireDefault para resolver erro de importação
 */
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = _interopRequireDefault;`);
  console.log('✅ Shim criado para interopRequireDefault');
}

console.log('\nVerificação de dependências do Babel concluída.');
console.log('\nSe você continuar tendo problemas com helpers do Babel, execute:');
console.log('npm run babel-fix');
console.log('npm run android-deep-clean');
