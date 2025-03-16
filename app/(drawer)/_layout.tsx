import React from 'react';
import { StyleSheet, Image, Text, View, Platform } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { FontAwesome } from '@expo/vector-icons';
// Corrigir o caminho de importação - usar um caminho relativo se o alias não funcionar
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Custom drawer content component with proper safe area handling
function CustomDrawerContent(props: any) {
  // Use static values instead of useSafeAreaInsets to avoid issues
  // This completely removes dependency on the problematic API
  const safePaddingTop = Platform.OS === 'ios' ? 44 : 16;
  
  // Mapeamento seguro de ícones
  const getIconName = (routeName: string): React.ComponentProps<typeof FontAwesome>['name'] => {
    const iconMap: Record<string, React.ComponentProps<typeof FontAwesome>['name']> = {
      'index': 'home',
      'bible': 'book',
      'two': 'calendar',
      'community': 'users',
      'devotional': 'heart',
      'offerings': 'dollar',
      'location': 'map-marker'
    };
    
    return iconMap[routeName] || 'circle';
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        styles.drawerContentContainer, 
        { paddingTop: safePaddingTop }
      ]}
    >
      {/* Drawer Header */}
      <LinearGradient
        colors={['#000000', '#333333']}
        style={styles.drawerHeader}
      >
        <Image
          source={{ uri: 'https://placekitten.com/100/100' }}
          style={styles.churchLogo}
        />
        <Text style={styles.churchName}>Igreja Batista Renovada</Text>
        <Text style={styles.churchMotto}>Fé, Renovação e Esperança</Text>
      </LinearGradient>

      {/* Drawer Items */}
      {props.state.routes.map((route: any, index: number) => {
        const { options } = props.descriptors[route.key];
        const label = options.drawerLabel || options.title || route.name;
        const isFocused = props.state.index === index;
        const iconName = getIconName(route.name);
        
        return (
          <DrawerItem
            key={route.key}
            label={label}
            focused={isFocused}
            onPress={() => props.navigation.navigate(route.name)}
            icon={({color, size}) => (
              <FontAwesome 
                name={iconName} 
                size={size} 
                color={isFocused ? Colors.dark.secondary : '#888888'} 
              />
            )}
            activeTintColor={Colors.dark.secondary}
            inactiveTintColor="#888888"
            activeBackgroundColor={Colors.dark.card}
            style={styles.drawerItem}
            labelStyle={styles.drawerItemLabel}
          />
        );
      })}
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.dark.background,
        },
        headerTintColor: Colors.dark.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: Colors.dark.background,
          width: 280,
        },
        swipeEnabled: true,
        drawerType: Platform.OS === 'android' ? "front" : "slide",
        overlayColor: 'rgba(0,0,0,0.7)',
        // Add these options for better performance on Android
        lazy: false,
        // Configurações de animação específicas para Android
        drawerStatusBarAnimation: 'slide',
        // Melhorando a performance em Android
        keyboardDismissMode: 'on-drag',
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Igreja Batista Renovada",
          drawerLabel: "Início"
        }}
      />
      <Drawer.Screen
        name="bible"
        options={{
          title: "Bíblia Sagrada",
          drawerLabel: "Bíblia"
        }}
      />
      <Drawer.Screen
        name="two"
        options={{
          title: "Agenda de Eventos",
          drawerLabel: "Eventos"
        }}
      />
      <Drawer.Screen
        name="community"
        options={{
          title: "Nossa Comunidade",
          drawerLabel: "Comunidade"
        }}
      />
      <Drawer.Screen
        name="devotional"
        options={{
          title: "Devocional Diário",
          drawerLabel: "Devocional"
        }}
      />
      <Drawer.Screen
        name="offerings"
        options={{
          title: "Ofertas e Dízimos",
          drawerLabel: "Ofertas"
        }}
      />
      <Drawer.Screen
        name="location"
        options={{
          title: "Nossa Localização",
          drawerLabel: "Localização"
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerContentContainer: {
    flex: 1,
  },
  drawerHeader: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  churchLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.dark.secondary,
    marginBottom: 12,
  },
  churchName: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  churchMotto: {
    color: '#888888',
    fontSize: 14,
  },
  drawerItem: {
    marginHorizontal: 4,
    marginVertical: 2,
    borderRadius: 8,
  },
  drawerItemLabel: {
    fontSize: 16,
    fontWeight: '400',
  }
});
