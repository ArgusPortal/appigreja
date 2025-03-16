/**
 * Fallback para expo-router/_error
 * Criado automaticamente para resolver problemas com o Metro bundler
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErrorPage({error}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ocorreu um erro</Text>
      <Text style={styles.message}>{error?.message || 'Erro desconhecido'}</Text>
    </View>
  );
}

// Também exportamos um componente para uso na web
export function ErrorComponent({error}) {
  return ErrorPage({error});
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});
