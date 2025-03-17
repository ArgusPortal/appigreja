/**
 * AGGRESSIVE error suppression for React Native
 * Import this at the very top of App.js before any other imports
 */

// Install multiple error handling mechanisms immediately on import
(function() {
  console.log('[BlockEvents] Installing error handlers...');
  
  if (typeof global !== 'undefined') {
    // List of error patterns to suppress
    const ERROR_PATTERNS = [
      "Text strings must be rendered within a <Text> component",
      "topInsetsChange",
      "insetsChange",
      "Cannot read property 'type' of undefined",
      "undefined is not an object"
    ];
    
    // 1. Global error handler - catches all JS errors
    if (global.ErrorUtils) {
      const originalHandler = global.ErrorUtils.getGlobalHandler();
      global.ErrorUtils.setGlobalHandler((error, isFatal) => {
        // Check if this is a known error we want to suppress
        if (error && error.message) {
          for (const pattern of ERROR_PATTERNS) {
            if (error.message.includes(pattern)) {
              console.warn(`[BlockEvents] Suppressed error: ${pattern}`);
              return; // Block the error entirely
            }
          }
        }
        return originalHandler(error, isFatal);
      });
      console.log('[BlockEvents] Installed global error handler');
    }
    
    // 2. React Native bridge event blocker - most direct approach
    try {
      setTimeout(() => {
        if (global.__fbBatchedBridge) {
          const originalCallFunction = global.__fbBatchedBridge.callFunctionReturnFlushedQueue;
          if (originalCallFunction) {
            global.__fbBatchedBridge.callFunctionReturnFlushedQueue = function(module, method, args) {
              // Special handling for problematic events
              if (module === 'RCTEventEmitter' && method === 'receiveEvent') {
                const eventType = args && args[1];
                if (eventType && (
                    String(eventType).includes('topInsetsChange') || 
                    String(eventType).includes('insetsChange')
                )) {
                  console.log(`[BlockEvents] Blocked event: ${eventType}`);
                  return [[], [], []]; // Return empty queue
                }
              }
              return originalCallFunction.apply(this, arguments);
            };
            console.log('[BlockEvents] Installed bridge event blocker');
          }
        }
      }, 0);
    } catch (e) {
      console.log('[BlockEvents] Failed to patch event system:', e);
    }
    
    // 3. React warning handler - often catches Text issues before they become errors
    try {
      // Check if we're in the React Native environment
      if (global.console && console.error) {
        const originalConsoleError = console.error;
        console.error = function() {
          if (arguments[0] && typeof arguments[0] === 'string') {
            const message = arguments[0];
            for (const pattern of ERROR_PATTERNS) {
              if (message.includes(pattern)) {
                console.log(`[BlockEvents] Suppressed console error: ${pattern}`);
                return; // Don't print this error
              }
            }
          }
          return originalConsoleError.apply(console, arguments);
        };
        console.log('[BlockEvents] Installed console error handler');
      }
    } catch (e) {
      console.log('[BlockEvents] Failed to patch console:', e);
    }
  }
  
  console.log('[BlockEvents] Setup complete');
})();

export default { active: true };
