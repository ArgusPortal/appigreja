import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { DrawerContentScrollView } from '@react-navigation/drawer';

// Custom drawer content component
function CustomDrawerContent(props: any) {
  // Map of route names to icon names
  const iconMap: Record<string, React.ComponentProps<typeof FontAwesome>['name']> = {
    'index': 'home',
    'bible': 'book',
    'two': 'calendar',
    'community': 'users',
    'devotional': 'heart',
    'offerings': 'dollar',
    'location': 'map-marker'
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContentContainer}
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
        const iconName = iconMap[route.name] || 'circle';
        
        return (
          <View
            key={route.key}
            style={[
              styles.drawerItem,
              isFocused && styles.drawerItemFocused,
            ]}
          >
            <FontAwesome 
              name={iconName}
              size={22}
              color={isFocused ? Colors.dark.secondary : '#888888'}
              style={styles.drawerItemIcon}
            />
            <Text 
              style={[
                styles.drawerItemLabel,
                isFocused && styles.drawerItemLabelFocused
              ]}
              onPress={() => {
                props.navigation.navigate(route.name);
              }}
            >
              {label}
            </Text>
          </View>
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
        drawerType: "front",
        overlayColor: 'rgba(0,0,0,0.7)',
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
    paddingTop: 0,
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 2,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  drawerItemFocused: {
    backgroundColor: Colors.dark.card,
  },
  drawerItemIcon: {
    marginRight: 12,
  },
  drawerItemLabel: {
    fontSize: 16,
    color: '#888888',
  },
  drawerItemLabelFocused: {
    color: Colors.dark.secondary,
    fontWeight: '600',
  },
});
