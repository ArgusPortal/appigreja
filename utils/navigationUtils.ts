import { useCallback } from 'react';
import { BackHandler, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import type { DrawerNavigationProp } from '@react-navigation/drawer';

/**
 * Fixes for common navigation issues
 */

/**
 * Helper hook for safe navigation with type checking
 */
export function useSafeNavigation() {
  const router = useRouter();
  
  const navigate = useCallback((route: string) => {
    if (!route) return;
    
    try {
      // For safety, wrap in try/catch
      router.push(route as any);
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to basic navigation
      router.navigate(route as never);
    }
  }, [router]);
  
  return { navigate };
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
