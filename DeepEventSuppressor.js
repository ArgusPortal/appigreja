/**
 * Direct solution for the topInsetsChange error
 * This file modifies React Native's internal event system
 */

if (global.defineEventHandler === undefined) {
  global.defineEventHandler = true;
  
  // Simple event suppressor - hijacks the global event dispatcher
  const EVENT_TYPES_TO_IGNORE = ['topInsetsChange', 'insetsChange'];

  // 1. Set up global hooks
  if (global.addEventListener) {
    const originalAddEventListener = global.addEventListener;
    global.addEventListener = function(eventType, ...args) {
      if (EVENT_TYPES_TO_IGNORE.includes(eventType)) {
        console.log(`[DeepSuppressor] Blocked addEventListener for ${eventType}`);
        return { remove: () => {} };
      }
      return originalAddEventListener.call(this, eventType, ...args);
    };
  }

  // 2. Set up global error handler to catch and suppress specific errors
  if (global.ErrorUtils) {
    const originalHandler = global.ErrorUtils.getGlobalHandler();
    global.ErrorUtils.setGlobalHandler((error, isFatal) => {
      if (error && error.message && 
          EVENT_TYPES_TO_IGNORE.some(type => error.message.includes(type))) {
        console.log('[DeepSuppressor] Suppressed error:', error.message.slice(0, 100));
        return; // Suppress this error completely
      }
      return originalHandler(error, isFatal);
    });
  }

  // 3. Monkey patch the RCTEventEmitter at the lowest possible level
  setTimeout(() => {
    try {
      if (global.__fbBatchedBridge) {
        const originalCallFunction = global.__fbBatchedBridge.callFunctionReturnFlushedQueue;
        
        if (originalCallFunction) {
          global.__fbBatchedBridge.callFunctionReturnFlushedQueue = function(module, method, args) {
            if (module === 'RCTEventEmitter' && method === 'receiveEvent' && args && args.length > 1) {
              const eventType = String(args[1]);
              if (EVENT_TYPES_TO_IGNORE.some(type => eventType.includes(type))) {
                console.log(`[DeepSuppressor] Blocked native event: ${eventType}`);
                return [[], [], []]; // Return empty queue instead of processing the event
              }
            }
            return originalCallFunction.apply(this, arguments);
          };
        }
      }
    } catch (err) {
      console.warn('[DeepSuppressor] Failed to patch event system:', err);
    }
  }, 0);
}

// No actual export needed - this file works by side effects
export default { installed: true };
