import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

// Dados simulados de grupos da igreja
const churchGroups = [
  { 
    id: '1', 
    name: 'Jovens Renovados', 
    members: 42, 
    nextMeeting: 'Sábado, 18:30',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  { 
    id: '2', 
    name: 'Grupo de Louvor', 
    members: 15, 
    nextMeeting: 'Quarta, 19:00',
    image: 'https://images.unsplash.com/photo-1525770041010-2a1233dd8152?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  // Mais grupos...
];

// Próximos aniversariantes
const upcomingBirthdays = [
  { id: '1', name: 'Maria Silva', date: '24/06', image: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { id: '2', name: 'João Pereira', date: '28/06', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '3', name: 'Ana Oliveira', date: '30/06', image: 'https://randomuser.me/api/portraits/women/48.jpg' },
];

// Componente de card para grupo
const GroupCard = ({ group }: { group: typeof churchGroups[0] }) => (
  <TouchableOpacity style={styles.groupCard} activeOpacity={0.8}>
    <Image source={{ uri: group.image }} style={styles.groupImage} />
    <View style={styles.groupInfo}>
      <Text style={styles.groupName}>{group.name}</Text>
      <Text style={styles.groupMembers}>{group.members} membros</Text>
      <View style={styles.meetingInfo}>
        <FontAwesome name="calendar" size={14} color={Colors.dark.secondary} />
        <Text style={styles.meetingText}> {group.nextMeeting}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

// Componente para card de aniversário
const BirthdayCard = ({ person }: { person: typeof upcomingBirthdays[0] }) => (
  <View style={styles.birthdayCard}>
    <Image source={{ uri: person.image }} style={styles.birthdayImage} />
    <View style={styles.birthdayInfo}>
      <Text style={styles.birthdayName}>{person.name}</Text>
      <Text style={styles.birthdayDate}>{person.date}</Text>
    </View>
    <TouchableOpacity style={styles.wishButton}>
      <FontAwesome name="gift" size={16} color={Colors.dark.secondary} />
    </TouchableOpacity>
  </View>
);

export default function Community() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <LinearGradient
          colors={['#000000', '#333333']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.headerGradient}
        >
          <Text style={styles.headerTitle}>Nossa Comunidade</Text>
          <Text style={styles.headerSubtitle}>Conectados pela fé</Text>
        </LinearGradient>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Grupos e Ministérios</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllLink}>Ver todos</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={churchGroups}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <GroupCard group={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.groupList}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Aniversariantes do Mês</Text>
        </View>
        {upcomingBirthdays.map(person => (
          <BirthdayCard key={person.id} person={person} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    marginBottom: 16,
  },
  headerGradient: {
    padding: 24,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: 'transparent',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
  seeAllLink: {
    color: Colors.dark.secondary,
    fontSize: 14,
  },
  groupList: {
    paddingRight: 16,
  },
  groupCard: {
    width: 220,
    marginRight: 16,
    borderRadius: 16,
    backgroundColor: Colors.dark.card,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.dark.cardBorder,
  },
  groupImage: {
    width: '100%',
    height: 120,
  },
  groupInfo: {
    padding: 12,
    backgroundColor: 'transparent',
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
  groupMembers: {
    fontSize: 14,
    color: '#888888',
    marginTop: 4,
  },
  meetingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: 'transparent',
  },
  meetingText: {
    fontSize: 14,
    color: Colors.dark.secondary,
  },
  birthdayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.dark.cardBorder,
  },
  birthdayImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  birthdayInfo: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: 'transparent',
  },
  birthdayName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  birthdayDate: {
    fontSize: 14,
    color: Colors.dark.secondary,
    marginTop: 2,
  },
  wishButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
