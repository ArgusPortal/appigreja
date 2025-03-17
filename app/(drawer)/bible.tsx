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
  { id: '6', name: 'Josué', chapters: 24 },
  { id: '7', name: 'Juízes', chapters: 21 },
  { id: '8', name: 'Rute', chapters: 4 },
  { id: '9', name: '1 Samuel', chapters: 31 },
  { id: '10', name: '2 Samuel', chapters: 24 },
  { id: '11', name: '1 Reis', chapters: 22 },
  { id: '12', name: '2 Reis', chapters: 25 },
  { id: '13', name: '1 Crônicas', chapters: 29 },
  { id: '14', name: '2 Crônicas', chapters: 36 },
  { id: '15', name: 'Esdras', chapters: 10 },
  { id: '16', name: 'Neemias', chapters: 13 },
  { id: '17', name: 'Ester', chapters: 10 },
  { id: '18', name: 'Jó', chapters: 42 },
  { id: '19', name: 'Salmos', chapters: 150 },
  { id: '20', name: 'Provérbios', chapters: 31 },
  { id: '21', name: 'Eclesiastes', chapters: 12 },
  { id: '22', name: 'Cânticos', chapters: 8 },
  { id: '23', name: 'Isaías', chapters: 66 },
  { id: '24', name: 'Jeremias', chapters: 52 },
  { id: '25', name: 'Lamentações', chapters: 5 },
  { id: '26', name: 'Ezequiel', chapters: 48 },
  { id: '27', name: 'Daniel', chapters: 12 },
  { id: '28', name: 'Oséias', chapters: 14 },
  { id: '29', name: 'Joel', chapters: 3 },
  { id: '30', name: 'Amós', chapters: 9 },
  { id: '31', name: 'Obadias', chapters: 1 },
  { id: '32', name: 'Jonas', chapters: 4 },
  { id: '33', name: 'Miquéias', chapters: 7 },
  { id: '34', name: 'Naum', chapters: 3 },
  { id: '35', name: 'Habacuque', chapters: 3 },
  { id: '36', name: 'Sofonias', chapters: 3 },
  { id: '37', name: 'Ageu', chapters: 2 },
  { id: '38', name: 'Zacarias', chapters: 14 },
  { id: '39', name: 'Malaquias', chapters: 4 },
  { id: '40', name: 'Mateus', chapters: 28 },
  { id: '41', name: 'Marcos', chapters: 16 },
  { id: '42', name: 'Lucas', chapters: 24 },
  { id: '43', name: 'João', chapters: 21 },
  { id: '44', name: 'Atos', chapters: 28 },
  { id: '45', name: 'Romanos', chapters: 16 },
  { id: '46', name: '1 Coríntios', chapters: 16 },
  { id: '47', name: '2 Coríntios', chapters: 13 },
  { id: '48', name: 'Gálatas', chapters: 6 },
  { id: '49', name: 'Efésios', chapters: 6 },
  { id: '50', name: 'Filipenses', chapters: 4 },
  { id: '51', name: 'Colossenses', chapters: 4 },
  { id: '52', name: '1 Tessalonicenses', chapters: 5 },
  { id: '53', name: '2 Tessalonicenses', chapters: 3 },
  { id: '54', name: '1 Timóteo', chapters: 6 },
  { id: '55', name: '2 Timóteo', chapters: 4 },
  { id: '56', name: 'Tito', chapters: 3 },
  { id: '57', name: 'Filemom', chapters: 1 },
  { id: '58', name: 'Hebreus', chapters: 13 },
  { id: '59', name: 'Tiago', chapters: 5 },
  { id: '60', name: '1 Pedro', chapters: 5 },
  { id: '61', name: '2 Pedro', chapters: 3 },
  { id: '62', name: '1 João', chapters: 5 },
  { id: '63', name: '2 João', chapters: 1 },
  { id: '64', name: '3 João', chapters: 1 },
  { id: '65', name: 'Judas', chapters: 1 },
  { id: '66', name: 'Apocalipse', chapters: 22 }
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
