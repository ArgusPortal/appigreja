import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

// Interfaces for component props
interface MinistryCardProps {
  title: string;
  description: string;
  image: string;
  leader?: string;
}

interface BirthdayCardProps {
  name: string;
  date: string;
  image: string;
}

interface CommunityGroupProps {
  name: string;
  members: number;
  meetingTime: string;
  image: string;
}

// Data interfaces
interface Ministry {
  id: string;
  title: string;
  description: string;
  image: string;
  leader: string;
}

interface Birthday {
  id: string;
  name: string;
  date: string;
  image: string;
}

interface Group {
  id: string;
  name: string;
  members: number;
  meetingTime: string;
  image: string;
}

// Component for ministry cards with improved contrast
const MinistryCard = ({ title, description, image, leader }: MinistryCardProps) => (
  <View style={styles.card}>
    <Image 
      source={{ uri: image }} 
      style={styles.cardImage}
      // Removed defaultSource to fix the bundling error
    />
    <LinearGradient
      colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.7)']} // Darker gradient for better contrast
      style={styles.cardOverlay}
    >
      {/* Improved title with better contrast */}
      <View style={styles.cardTitleContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={styles.divider} />
      </View>
      
      <Text style={styles.cardDescription}>{description}</Text>
      {leader && (
        <View style={styles.leaderContainer}>
          <FontAwesome name="user" size={14} color={Colors.dark.secondary} />
          <Text style={styles.leaderText}>Líder: {leader}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.learnMoreButton}>
        <Text style={styles.learnMoreText}>Saiba mais</Text>
      </TouchableOpacity>
    </LinearGradient>
  </View>
);

// Upcoming birthdays card component
const BirthdayCard = ({ name, date, image }: BirthdayCardProps) => (
  <View style={styles.birthdayCard}>
    <Image 
      source={{ uri: image }} 
      style={styles.birthdayAvatar}
      // Removed defaultSource to fix the bundling error
    />
    <View style={styles.birthdayInfo}>
      <Text style={styles.birthdayName}>{name}</Text>
      <Text style={styles.birthdayDate}>{date}</Text>
    </View>
    <TouchableOpacity style={styles.birthdayButton}>
      <FontAwesome name="gift" size={16} color="#fff" />
    </TouchableOpacity>
  </View>
);

// Community groups component
const CommunityGroup = ({ name, members, meetingTime, image }: CommunityGroupProps) => (
  <TouchableOpacity style={styles.groupCard}>
    <Image 
      source={{ uri: image }} 
      style={styles.groupImage}
      // Removed defaultSource to fix the bundling error
    />
    <View style={styles.groupContent}>
      <Text style={styles.groupName}>{name}</Text>
      <Text style={styles.groupMembers}>{members} membros</Text>
      <View style={styles.meetingRow}>
        <FontAwesome name="calendar" size={14} color={Colors.dark.secondary} style={{marginRight: 6}} />
        <Text style={styles.meetingTime}>{meetingTime}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default function CommunityScreen() {
  // Data for our ministries/groups
  const ministries: Ministry[] = [
    {
      id: '1',
      title: 'Ministério de Louvor',
      description: 'Grupo dedicado à adoração e condução musical nos cultos e eventos especiais.',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      leader: 'João Silva'
    },
    {
      id: '2',
      title: 'Ministério Infantil',
      description: 'Dedicado ao ensino bíblico e desenvolvimento espiritual das crianças.',
      image: 'https://images.unsplash.com/photo-1484820540004-14229fe36ca4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      leader: 'Maria Santos'
    },
    {
      id: '3',
      title: 'Jovens da Fé',
      description: 'Grupo voltado para adolescentes e jovens com atividades sociais e espirituais.',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      leader: 'Pedro Oliveira'
    },
    {
      id: '4',
      title: 'Ação Social',
      description: 'Trabalho de assistência às comunidades carentes e pessoas necessitadas.',
      image: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      leader: 'Ana Costa'
    }
  ];

  // Data for upcoming birthdays
  const birthdays: Birthday[] = [
    { id: '1', name: 'Maria Silva', date: '24/06', image: 'https://randomuser.me/api/portraits/women/12.jpg' },
    { id: '2', name: 'João Pereira', date: '28/06', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: '3', name: 'Ana Oliveira', date: '30/06', image: 'https://randomuser.me/api/portraits/women/48.jpg' },
  ];

  // Data for community groups
  const groups: Group[] = [
    { 
      id: '1', 
      name: 'Jovens Renovados', 
      members: 42, 
      meetingTime: 'Sábado, 18:30',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: '2', 
      name: 'Grupo de Louvor', 
      members: 15, 
      meetingTime: 'Quarta, 19:00',
      image: 'https://images.unsplash.com/photo-1525770041010-2a1233dd8152?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: '3', 
      name: 'Círculo de Oração', 
      members: 28, 
      meetingTime: 'Terça, 19:30',
      image: 'https://images.unsplash.com/photo-1476900966873-ab290e38e3f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header with improved contrast */}
      <View style={styles.header}>
        <LinearGradient
          colors={['#1a1a1a', '#2a2a2a']} // Darker gradient for better contrast
          style={styles.headerGradient}
        >
          <Text style={styles.headerTitle}>Nossa Comunidade</Text>
          <Text style={styles.headerSubtitle}>Unidos pela fé e amor</Text>
        </LinearGradient>
      </View>
      
      {/* Ministries Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nossos Ministérios</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          {ministries.map(ministry => (
            <MinistryCard 
              key={ministry.id}
              title={ministry.title} 
              description={ministry.description}
              image={ministry.image}
              leader={ministry.leader}
            />
          ))}
        </ScrollView>
      </View>
      
      {/* Community Groups Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Grupos</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Ver todos</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.groupsContainer}>
          {groups.map(group => (
            <CommunityGroup 
              key={group.id}
              name={group.name}
              members={group.members}
              meetingTime={group.meetingTime}
              image={group.image}
            />
          ))}
        </View>
      </View>
      
      {/* Birthdays Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Aniversariantes do Mês</Text>
        <View style={styles.birthdaysContainer}>
          {birthdays.map(birthday => (
            <BirthdayCard 
              key={birthday.id}
              name={birthday.name}
              date={birthday.date}
              image={birthday.image}
            />
          ))}
        </View>
      </View>
      
      {/* Call to Action */}
      <View style={styles.ctaContainer}>
        <Text style={styles.ctaText}>Venha participar de nossa comunidade!</Text>
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Encontre um grupo</Text>
        </TouchableOpacity>
      </View>
      
      {/* Add padding at bottom for better scrolling */}
      <View style={{height: 40}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    marginBottom: 20,
    overflow: 'hidden',
  },
  headerGradient: {
    padding: 25,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF', // Using explicit white for better visibility
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.dark.secondary, // Using accent color for subtitle
    textAlign: 'center',
  },
  
  // Section styles
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 16,
    marginLeft: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  seeAllText: {
    color: Colors.dark.secondary,
    fontSize: 14,
  },
  horizontalScroll: {
    paddingLeft: 4,
    paddingRight: 16,
  },
  
  // Ministry card styles
  card: {
    width: 280,
    height: 200,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#222', // Fallback background color for images
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingTop: 24,
  },
  cardTitleContainer: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  divider: {
    height: 2,
    width: 40,
    backgroundColor: Colors.dark.secondary,
    marginTop: 6,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#EEEEEE',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  leaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  leaderText: {
    fontSize: 13,
    color: '#EEEEEE',
    marginLeft: 8,
  },
  learnMoreButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  learnMoreText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  
  // Group card styles
  groupsContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  groupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.dark.cardBorder,
  },
  groupImage: {
    width: 80,
    height: 80,
    backgroundColor: '#222', // Fallback background color
  },
  groupContent: {
    flex: 1,
    padding: 12,
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  groupMembers: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 6,
  },
  meetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meetingTime: {
    fontSize: 14,
    color: Colors.dark.secondary,
  },
  
  // Birthday card styles
  birthdaysContainer: {
    marginTop: 8,
  },
  birthdayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.dark.cardBorder,
  },
  birthdayAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333', // Fallback background color
  },
  birthdayInfo: {
    flex: 1,
    marginLeft: 12,
  },
  birthdayName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.dark.text,
  },
  birthdayDate: {
    fontSize: 14,
    color: Colors.dark.secondary,
    marginTop: 2,
  },
  birthdayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.dark.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Call to action section
  ctaContainer: {
    marginHorizontal: 16,
    marginVertical: 24,
    padding: 20,
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.cardBorder,
  },
  ctaText: {
    fontSize: 16,
    color: Colors.dark.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaButton: {
    backgroundColor: Colors.dark.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
