// Fallback shim for react-native-gesture-handler
try {
  module.exports = require('react-native-gesture-handler');
} catch (e) {
  console.warn('react-native-gesture-handler not found, using fallback');
  const React = require('react');
  const { View } = require('react-native');
  
  // Create basic gesture components
  const GestureHandlerRootView = (props) => React.createElement(View, props);
  const TapGestureHandler = (props) => React.createElement(View, props);
  const PanGestureHandler = (props) => React.createElement(View, props);
  
  module.exports = {
    GestureHandlerRootView,
    TapGestureHandler,
    PanGestureHandler,
    State: {
      ACTIVE: 'ACTIVE',
      BEGAN: 'BEGAN',
      CANCELLED: 'CANCELLED',
      END: 'END',
      FAILED: 'FAILED',
      UNDETERMINED: 'UNDETERMINED',
    },
  };
}
