// Direct shim for objectWithoutProperties
function objectWithoutProperties(obj, keys) {
  const target = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && !keys.includes(key)) {
      target[key] = obj[key];
    }
  }
  return target;
}

module.exports = objectWithoutProperties;
module.exports.default = objectWithoutProperties;
