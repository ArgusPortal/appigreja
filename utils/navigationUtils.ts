import { useCallback } from 'react';
import { BackHandler, Platform } from 'react-native';
import { useRouter } from 'expo-router';

// Import types only to avoid runtime errors
import type { DrawerNavigationProp } from '@react-navigation/drawer';

/**
 * Helper hook for safe navigation with type checking
 */
export function useSafeNavigation() {
  const router = useRouter();
  
  const navigate = useCallback((route: string) => {
    if (!route) return;
    
    try {
      // For safety, wrap in try/catch
      router.push(route);
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to basic navigation
      try {
        router.navigate(route as never);
      } catch (err) {
        console.error('Fallback navigation failed:', err);
      }
    }
  }, [router]);
  
  return { navigate };
}

/**
 * Utility to handle drawer opening in components
 */
export function useDrawerToggle(navigation: any) {
  const openDrawer = useCallback(() => {
    if (navigation?.openDrawer) {
      try {
        navigation.openDrawer();
      } catch (error) {
        console.error('Error opening drawer:', error);
      }
    } else {
      console.warn('Drawer navigation is not available');
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
    
    try {
      if (navigation?.canGoBack && typeof navigation.canGoBack === 'function' && navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }
    } catch (error) {
      console.error('Error handling back button:', error);
    }
    
    return false;
  }, [navigation]);
  
  return { backAction };
}
