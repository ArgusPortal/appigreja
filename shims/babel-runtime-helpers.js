// This file provides shims for common Babel runtime helpers

function objectWithoutProperties(obj, keys) {
  const target = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && !keys.includes(key)) {
      target[key] = obj[key];
    }
  }
  return target;
}

const interopRequireDefault = obj => obj && obj.__esModule ? obj : { default: obj };

module.exports = {
  objectWithoutProperties,
  interopRequireDefault,
  default: {
    objectWithoutProperties,
    interopRequireDefault
  }
};
