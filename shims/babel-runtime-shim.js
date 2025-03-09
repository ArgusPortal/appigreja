/**
 * Shim para @babel/runtime/helpers
 */

// interopRequireDefault helper
function interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// Outros helpers comuns
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

// Export CommonJS
module.exports = {
  interopRequireDefault: interopRequireDefault,
  extends: _extends
};
