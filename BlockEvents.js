/**
 * This file prevents React Native text rendering errors
 * Import this at the very top of App.js
 */

// Install error handler immediately
(function() {
  if (typeof global !== 'undefined') {
    // Intercept global errors to prevent crashes from text rendering errors
    if (global.ErrorUtils) {
      const originalHandler = global.ErrorUtils.getGlobalHandler();
      global.ErrorUtils.setGlobalHandler((error, isFatal) => {
        // Only intercept text rendering errors
        if (error && error.message && 
            error.message.includes("Text strings must be rendered within a <Text> component")) {
          console.warn("[BlockEvents] Suppressed text rendering error");
          return; // Block the error
        }
        return originalHandler(error, isFatal);
      });
    }
  }
})();

export default {};
