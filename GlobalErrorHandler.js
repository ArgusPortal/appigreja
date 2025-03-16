/**
 * This file provides global error handling for problematic React Native events
 * Import this file at the very top of App.js
 */

// Block these problematic events
const BLOCKED_EVENTS = [
  'topInsetsChange',
  'insetsChange',
  'topInset',
  'inset'
];

// Install global error handler immediately
if (typeof global !== 'undefined') {
  // 1. Replace the global error handler to catch and suppress topInsetsChange errors
  if (global.ErrorUtils) {
    const originalHandler = global.ErrorUtils.getGlobalHandler();
    global.ErrorUtils.setGlobalHandler((error, isFatal) => {
      if (error && error.message && BLOCKED_EVENTS.some(event => error.message.includes(event))) {
        console.log(`[GlobalErrorHandler] Suppressed error containing: ${error.message.substring(0, 50)}...`);
        return; // Don't propagate this error
      }
      return originalHandler(error, isFatal);
    });
  }

  // 2. Block the React Native bridge event system
  try {
    setTimeout(() => {
      if (global.__fbBatchedBridge) {
        const originalCallFunction = global.__fbBatchedBridge.callFunctionReturnFlushedQueue;
        if (originalCallFunction) {
          global.__fbBatchedBridge.callFunctionReturnFlushedQueue = function(module, method, args) {
            if (module === 'RCTEventEmitter' && method === 'receiveEvent' && args && args.length > 1) {
              const eventType = args[1];
              if (BLOCKED_EVENTS.some(event => String(eventType).includes(event))) {
                console.log(`[GlobalErrorHandler] Blocked event: ${eventType}`);
                return [[], [], []]; // Return empty queue
              }
            }
            return originalCallFunction.apply(this, arguments);
          };
        }
      }
    }, 0);
  } catch (e) {
    console.log('[GlobalErrorHandler] Error installing bridge blocker');
  }
}

export default { installed: true };
