/**
 * This script suppresses problematic events at a global level
 * Import this at the very beginning of your App.js
 */

// List of problematic events to suppress
const SUPPRESSED_EVENTS = [
  'topInsetsChange',
  'insetsChange'
];

// Override the global error handler to ignore specific errors
if (global.ErrorUtils) {
  const originalHandler = global.ErrorUtils.getGlobalHandler();
  global.ErrorUtils.setGlobalHandler((error, isFatal) => {
    // Check if this is a known error we want to suppress
    if (error && error.message) {
      for (const eventType of SUPPRESSED_EVENTS) {
        if (error.message.includes(eventType)) {
          console.log(`[EventSuppressor] Ignored error for ${eventType}`);
          return; // Don't propagate this error
        }
      }
    }
    
    // For all other errors, use the original handler
    return originalHandler(error, isFatal);
  });
  
  console.log('[EventSuppressor] Installed global error handler');
}

// Try to patch the React Native event system if available
try {
  if (global.__fbBatchedBridge) {
    const originalCallFunctionReturnFlushedQueue = 
      global.__fbBatchedBridge.callFunctionReturnFlushedQueue;
    
    if (originalCallFunctionReturnFlushedQueue) {
      global.__fbBatchedBridge.callFunctionReturnFlushedQueue = 
        function(module, method, args) {
          // Intercept event dispatch calls
          if (module === 'RCTEventEmitter' && method === 'receiveEvent') {
            const eventType = args[1];
            if (SUPPRESSED_EVENTS.includes(eventType)) {
              console.log(`[EventSuppressor] Blocked event: ${eventType}`);
              return [[],[],[]]; // Return empty queue
            }
          }
          
          return originalCallFunctionReturnFlushedQueue.apply(this, arguments);
        };
      
      console.log('[EventSuppressor] Patched React Native bridge');
    }
  }
} catch (e) {
  console.log('[EventSuppressor] Failed to patch React Native bridge:', e);
}

export default {
  name: 'EventSuppressor',
  active: true
};
