import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import App from './App';

// Adicionar polyfills globais para plataforma web
if (typeof global.setTimeout === 'undefined') {
  global.setTimeout = (callback, timeout) => setTimeout(callback, timeout);
}

if (!global.setImmediate) {
  global.setImmediate = setTimeout;
}

// Adicionar tratamento de erros para plataforma web
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    console.warn('Erro global capturado:', event.error);
  });
}

registerRootComponent(App);
