import { useCallback } from 'react';
import { BackHandler, Platform, Alert } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import type { DrawerNavigationProp } from '@react-navigation/drawer';

/**
 * Fixes for common navigation issues
 */

/**
 * Helper hook for safe navigation with type checking
 */
export function useSafeNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  
  const navigate = useCallback((route: string) => {
    if (!route) return;
    
    // Don't navigate to the same route
    if (pathname === route) return;
    
    try {
      if (route.startsWith('/')) {
        router.push(route as any);
      } else {
        // Para rotas sem barra, adicione uma
        router.push(('/' + route) as any);
      }
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to basic navigation
      try {
        router.navigate(route as never);
      } catch (navError) {
        console.error('Fallback navigation failed:', navError);
      }
    }
  }, [router, pathname]);
  
  const navigateWithConfirmation = useCallback((route: string, message: string = 'Tem certeza que deseja sair desta página?') => {
    Alert.alert(
      'Confirmação',
      message,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sim', onPress: () => navigate(route) }
      ]
    );
  }, [navigate]);
  
  return { navigate, navigateWithConfirmation };
}

/**
 * Utility to handle drawer opening in components
 */
export function useDrawerToggle(navigation: DrawerNavigationProp<any> | undefined) {
  const openDrawer = useCallback(() => {
    if (navigation?.openDrawer) {
      navigation.openDrawer();
    }
  }, [navigation]);
  
  return { openDrawer };
}

/**
 * Handle Android back button for drawer navigation
 */
export function useAndroidBackHandler(navigation: any) {
  const backAction = useCallback(() => {
    if (Platform.OS !== 'android') return false;
    
    if (navigation?.canGoBack()) {
      navigation.goBack();
      return true;
    }
    
    return false;
  }, [navigation]);
  
  // You can use this with useEffect in your screens
  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  //   return () => backHandler.remove();
  // }, [backAction]);
  
  return { backAction };
}
