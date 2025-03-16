/**
 * Polyfill agressivo para bloquear eventos problemáticos
 * Esta versão ignora completamente os eventos causando problemas
 */

// Certifique-se de aplicar no início da execução
(function() {
  // Eventos problemáticos
  const PROBLEMATIC_EVENTS = [
    'topInsetsChange',
    'insetsChange', 
    'topInset',
    'inset'
  ];

  if (typeof global !== 'undefined') {
    console.log('[SafeAreaFix] Aplicando polyfill para eventos de insets');
    
    // Substituir addEventListener globalmente
    if (global.addEventListener) {
      const originalAddEventListener = global.addEventListener;
      global.addEventListener = function(event, callback) {
        if (PROBLEMATIC_EVENTS.includes(event)) {
          console.log(`[SafeAreaFix] Bloqueando evento: ${event}`);
          return { remove: () => {} };
        }
        return originalAddEventListener.apply(this, arguments);
      };
    }
    
    // Patchear o ReactNativeEventEmitter se disponível
    const patchEventEmitter = () => {
      if (global.__fbBatchedBridge && global.__fbBatchedBridge.EventEmitter) {
        const originalEmit = global.__fbBatchedBridge.EventEmitter.emit;
        global.__fbBatchedBridge.EventEmitter.emit = function(event, ...args) {
          if (PROBLEMATIC_EVENTS.includes(event) || 
              (typeof event === 'string' && PROBLEMATIC_EVENTS.some(e => event.includes(e)))) {
            console.log(`[SafeAreaFix] Bloqueando emissão de evento: ${event}`);
            return;
          }
          return originalEmit.apply(this, arguments);
        };
      }
    };
    
    // Tentar aplicar o patch imediatamente e novamente após um delay
    try {
      patchEventEmitter();
      setTimeout(patchEventEmitter, 1000);
    } catch (e) {
      console.warn('[SafeAreaFix] Erro ao aplicar patch no EventEmitter:', e);
    }
    
    // Também substituir o método emit do EventEmitter no UIManager
    if (global.ReactNative && global.ReactNative.UIManager) {
      const UIManager = global.ReactNative.UIManager;
      if (UIManager.emit) {
        const originalEmit = UIManager.emit;
        UIManager.emit = function(event, ...args) {
          if (PROBLEMATIC_EVENTS.includes(event)) {
            console.log(`[SafeAreaFix] Bloqueando UIManager.emit: ${event}`);
            return;
          }
          return originalEmit.apply(this, arguments);
        };
      }
      
      // Também patchear emitEvent
      if (UIManager.emitEvent) {
        const originalEmitEvent = UIManager.emitEvent;
        UIManager.emitEvent = function(target, eventName, params) {
          if (PROBLEMATIC_EVENTS.includes(eventName)) {
            console.log(`[SafeAreaFix] Bloqueando UIManager.emitEvent: ${eventName}`);
            return;
          }
          return originalEmitEvent.apply(this, arguments);
        };
      }
    }
  }
})();

// Precisa exportar algo para ser um módulo ES válido
export default { applied: true };
