import React from 'react';
import { Drawer } from 'expo-router/drawer';

export default function TestDrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="test" />
    </Drawer>
  );
}
