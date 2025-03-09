import { useEffect } from 'react';
import { BackHandler, Platform, Alert } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

/**
 * Hook para gerenciar o comportamento do botão voltar no Android
 * Pode ser usado em telas específicas para substituir o comportamento padrão
 */
export function useAndroidBackHandler(
  customHandler?: () => boolean, 
  showExitConfirm = false
) {
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    // Só aplicamos no Android
    if (Platform.OS !== 'android') return;
    
    const backAction = () => {
      // Prioriza handler customizado se fornecido
      if (customHandler && customHandler()) {
        return true;
      }
      
      // Na tela inicial, pergunta se quer sair do app
      if (pathname === '/index' || pathname === '/') {
        if (showExitConfirm) {
          Alert.alert(
            'Sair do aplicativo',
            'Tem certeza que deseja sair do aplicativo?',
            [
              { text: 'Cancelar', style: 'cancel', onPress: () => {} },
              { text: 'Sair', style: 'destructive', onPress: () => BackHandler.exitApp() }
            ]
          );
          return true;
        }
        return false;
      }
      
      // Nas outras telas, tenta navegar para trás
      if (router.canGoBack()) {
        router.back();
        return true;
      }
      
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [pathname, router, customHandler, showExitConfirm]);
}
