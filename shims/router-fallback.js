// Provides a robust fallback for expo-router
const React = require('react');
const { View, Text } = require('react-native');

// Create a simple error message component
const ErrorScreen = ({ message }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212', padding: 20 }}>
    <Text style={{ color: '#ffffff', fontSize: 18, marginBottom: 10, textAlign: 'center' }}>
      Router Navigation Error
    </Text>
    <Text style={{ color: '#888888', fontSize: 14, textAlign: 'center' }}>
      {message || 'Failed to load navigation'}
    </Text>
  </View>
);

// Basic component that just renders its children
const Passthrough = ({ children }) => children || null;

// Create router fallbacks
const fallbacks = {
  Slot: Passthrough,
  Stack: Passthrough,
  Drawer: Passthrough,
  Tabs: Passthrough,
  useRouter: () => ({
    push: () => console.warn('Router.push is not available'),
    replace: () => console.warn('Router.replace is not available'),
    back: () => console.warn('Router.back is not available'),
    canGoBack: () => false,
  }),
  Link: ({ children }) => children,
  usePathname: () => '/',
  useSegments: () => [],
  ErrorScreen,
};

// Try to load the actual expo-router
let actualRouter;
try {
  actualRouter = require('expo-router');
} catch (e) {
  console.warn('Could not load expo-router, using fallbacks');
  actualRouter = {};
}

// Export a combined router with fallbacks
module.exports = {
  ...fallbacks,
  ...actualRouter,
  // Make sure these specific components always exist
  Slot: actualRouter.Slot || fallbacks.Slot,
  Stack: actualRouter.Stack || fallbacks.Stack, 
  Drawer: actualRouter.Drawer || fallbacks.Drawer,
  Tabs: actualRouter.Tabs || fallbacks.Tabs,
};
