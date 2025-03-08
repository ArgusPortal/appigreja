// Fallback shim for expo-linear-gradient
try {
  module.exports = require('expo-linear-gradient');
} catch (e) {
  console.warn('expo-linear-gradient not found, using fallback');
  // Provide basic fallback implementation
  const View = require('react-native').View;
  const LinearGradient = (props) => {
    return View({ ...props, style: [props.style, { backgroundColor: '#000' }] });
  };
  module.exports = { LinearGradient };
}
