// This file must be loaded before any other React Native code
if (typeof global !== 'undefined') {
  // Define the original events object getter
  const eventTypes = [
    'topInsetsChange',
    'insetsChange'
  ];
  
  // Set up an object to track if we've installed the blockers
  const installed = {
    errorHandler: false,
    eventEmitter: false
  };

  // APPROACH 1: Block at the error level
  if (global.ErrorUtils && !installed.errorHandler) {
    const originalHandler = global.ErrorUtils.getGlobalHandler();
    global.ErrorUtils.setGlobalHandler((error, isFatal) => {
      if (error && error.message && eventTypes.some(evt => error.message.includes(evt))) {
        console.log(`[EventBlocker] Suppressed error: ${error.message}`);
        return; // Don't propagate this error
      }
      return originalHandler(error, isFatal);
    });
    installed.errorHandler = true;
  }

  // APPROACH 2: Block at the native bridge event level
  const patchEventSystem = () => {
    try {
      if (global.__fbBatchedBridge && !installed.eventEmitter) {
        // Intercept events at the bridge level
        const original = global.__fbBatchedBridge.callFunctionReturnFlushedQueue;
        if (original) {
          global.__fbBatchedBridge.callFunctionReturnFlushedQueue = function(module, method, args) {
            // Detect RCTEventEmitter.receiveEvent calls
            if (module === 'RCTEventEmitter' && method === 'receiveEvent') {
              const eventType = args && args[1];
              if (eventType && eventTypes.some(evt => eventType.includes(evt))) {
                console.log(`[EventBlocker] Blocked event: ${eventType}`);
                return [[], [], []]; // Return empty queue instead
              }
            }
            return original.apply(this, arguments);
          };
          installed.eventEmitter = true;
        }
      }
    } catch (e) {
      console.error('[EventBlocker] Failed to patch event system:', e);
    }
  };

  // Try to patch immediately and also after a delay
  patchEventSystem();
  setTimeout(patchEventSystem, 100);
}

export default {
  name: "EventBlocker",
  active: true,
};
