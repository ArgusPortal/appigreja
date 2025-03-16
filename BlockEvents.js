/**
 * This is a very aggressive event blocker that runs before React Native initializes
 */

// Install immediately on module import
(() => {
  if (typeof global !== 'undefined') {
    console.log('[BlockEvents] Installing event blockers...');
    
    // Block specific problematic events
    const eventsToBlock = ['topInsetsChange', 'insetsChange'];
    
    // 1. Monkey-patch ErrorUtils
    if (global.ErrorUtils) {
      const originalHandler = global.ErrorUtils.getGlobalHandler();
      global.ErrorUtils.setGlobalHandler((error, isFatal) => {
        // Block any errors containing our target event names
        if (error && error.message && 
            eventsToBlock.some(evt => String(error.message).includes(evt))) {
          console.log('[BlockEvents] Suppressed error:', error.message.slice(0, 50));
          return; // Completely suppress the error
        }
        return originalHandler(error, isFatal);
      });
      console.log('[BlockEvents] Installed ErrorUtils handler');
    }
    
    // 2. Override __fbBatchedBridge to intercept event dispatches
    setTimeout(() => {
      try {
        if (global.__fbBatchedBridge) {
          const original = global.__fbBatchedBridge.callFunctionReturnFlushedQueue;
          global.__fbBatchedBridge.callFunctionReturnFlushedQueue = function(module, method, args) {
            // Specifically target the event emitter that causes our problem
            if (module === 'RCTEventEmitter' && method === 'receiveEvent' && args?.length > 1) {
              const eventType = String(args[1] || '');
              if (eventsToBlock.some(evt => eventType.includes(evt))) {
                console.log('[BlockEvents] Blocked event:', eventType);
                return [[], [], []]; // Return empty queue
              }
            }
            return original.apply(this, arguments);
          };
          console.log('[BlockEvents] Installed bridge event blocker');
        }
      } catch (e) {
        console.error('[BlockEvents] Failed to install bridge blocker:', e);
      }
    }, 0);
  }
})();

// No-op export - the important code runs on import
export default {};
