/**
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

module.exports = _objectWithoutProperties;
