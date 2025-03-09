import React, { useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, TextInput, View as RNView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

// Dados simulados de livros da Bíblia
const bibleBooks = [
  { id: '1', name: 'Gênesis', chapters: 50 },
  { id: '2', name: 'Êxodo', chapters: 40 },
  { id: '3', name: 'Levítico', chapters: 27 },
  { id: '4', name: 'Números', chapters: 36 },
  { id: '5', name: 'Deuteronômio', chapters: 34 },
  // ...mais livros
];

// Componente para botões de navegação rápida
const QuickNavButton = ({ title, icon, onPress }: { title: string, icon: string, onPress: () => void }) => {
  // Segurança de tipo mais robusta para ícones FontAwesome
  let iconName: keyof typeof FontAwesome.glyphMap;
  
  // Lista segura de ícones conhecidos disponíveis
  const safeIcons = ['star', 'history', 'pencil', 'book', 'search', 'bookmark', 'circle'] as const;
  
  // Verifica se o ícone solicitado existe na lista segura
  if (safeIcons.includes(icon as any)) {
    iconName = icon as keyof typeof FontAwesome.glyphMap;
  } else {
    console.warn(`Ícone seguro não disponível: ${icon}`);
    iconName = 'circle'; // Fallback para um ícone garantido
  }
  
  return (
    <TouchableOpacity 
      style={styles.quickNavButton} 
      onPress={onPress}
      accessibilityLabel={title}
    >
      <FontAwesome name={iconName} size={18} color={Colors.dark.secondary} />
      <Text style={styles.quickNavText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function Bible() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredBooks = bibleBooks.filter(book => 
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bíblia Sagrada</Text>
        <Text style={styles.subtitle}>Nova Versão Internacional</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={16} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar livro..."
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>
      
      <View style={styles.quickNavContainer}>
        <QuickNavButton title="Favoritos" icon="star" onPress={() => {}} />
        <QuickNavButton title="Histórico" icon="history" onPress={() => {}} />
        <QuickNavButton title="Notas" icon="pencil" onPress={() => {}} />
      </View>
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Velho Testamento</Text>
      </View>
      
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.bookItem}>
            <Text style={styles.bookName}>{item.name}</Text>
            <Text style={styles.bookChapters}>{item.chapters} capítulos</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.dark.background,
  },
  header: {
    marginVertical: 16,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.secondary,
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: Colors.dark.text,
    fontSize: 16,
  },
  quickNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  quickNavButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  quickNavText: {
    marginLeft: 6,
    color: Colors.dark.secondary,
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
  bookItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    backgroundColor: 'transparent',
  },
  bookName: {
    fontSize: 18,
    color: Colors.dark.text,
  },
  bookChapters: {
    fontSize: 14,
    color: '#888888',
  },
});
