import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';

export default function DevotionalScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Devocional Diário</Text>
        <Text style={styles.subtitle}>Meditação do dia</Text>
        
        <View style={styles.devotionalCard}>
          <Text style={styles.verseReference}>Salmos 23:1-3</Text>
          <Text style={styles.verseText}>
            "O Senhor é o meu pastor, nada me faltará. Em verdes prados me faz repousar e me conduz a águas tranquilas; restaura as forças de minha alma e me guia por caminhos seguros."
          </Text>
          <Text style={styles.devotionalText}>
            Quando confiamos em Deus como nosso pastor, temos a certeza de que Ele nos guiará pelos caminhos corretos. Mesmo em momentos difíceis, Ele restaura nossa alma e nos dá descanso. Hoje, confie na condução do Senhor para sua vida.
          </Text>
        </View>
        
        <Text style={styles.sectionTitle}>Hoje na Bíblia</Text>
        <Text style={styles.readingPlan}>Plano de leitura: Romanos 8:1-17</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    padding: 20,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#888888',
    marginBottom: 24,
  },
  devotionalCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.dark.cardBorder,
  },
  verseReference: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.secondary,
    marginBottom: 16,
  },
  verseText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: Colors.dark.text,
    lineHeight: 26,
    marginBottom: 20,
  },
  devotionalText: {
    fontSize: 16,
    color: '#aaaaaa',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 12,
  },
  readingPlan: {
    fontSize: 16,
    color: Colors.dark.secondary,
  },
});
