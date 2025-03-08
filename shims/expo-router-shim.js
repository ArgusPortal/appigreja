// Fallback shim for expo-router
try {
  module.exports = require('expo-router');
} catch (e) {
  console.warn('expo-router not found, using fallback');
  // Basic fallback implementation
  const React = require('react');
  module.exports = {
    Link: ({ to, ...props }) => React.createElement('a', props),
    useRouter: () => ({
      push: () => {},
      replace: () => {},
      back: () => {},
      navigate: () => {},
    }),
    Tabs: ({ children }) => children,
    Stack: ({ children }) => children,
    Drawer: ({ children }) => children,
  };
}
