import React, { useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

// Tipos para os eventos da igreja
type EventCategory = 'culto' | 'estudo' | 'reunião' | 'confraternização' | 'missões' | 'todos';

interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: EventCategory;
  description: string;
  image: string;
}

// Dados simulados de eventos
const churchEvents: ChurchEvent[] = [
  {
    id: '1',
    title: 'Culto de Celebração',
    date: '22/06/2024',
    time: '19:00 - 21:00',
    location: 'Templo Principal',
    category: 'culto',
    description: 'Venha celebrar conosco neste culto especial de louvor e adoração. Tema: "Renovação Espiritual".',
    image: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: '2',
    title: 'Estudo Bíblico',
    date: '25/06/2024',
    time: '19:30 - 21:00',
    location: 'Sala 3',
    category: 'estudo',
    description: 'Estudo aprofundado sobre o livro de Romanos. Traga sua Bíblia e caderno para anotações.',
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: '3',
    title: 'Reunião de Jovens',
    date: '27/06/2024',
    time: '20:00 - 22:00',
    location: 'Salão Social',
    category: 'reunião',
    description: 'Noite especial para jovens com música, dinâmicas e uma palavra inspiradora.',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: '4',
    title: 'Café da Manhã Fraterno',
    date: '29/06/2024',
    time: '08:00 - 10:00',
    location: 'Refeitório',
    category: 'confraternização',
    description: 'Momento de comunhão com um delicioso café da manhã para toda a igreja. Traga um prato para compartilhar.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: '5',
    title: 'Ação Missionária',
    date: '06/07/2024',
    time: '09:00 - 15:00',
    location: 'Comunidade Vila Nova',
    category: 'missões',
    description: 'Atividade evangelística na comunidade Vila Nova. Participe desta importante missão!',
    image: 'https://images.unsplash.com/photo-1503384999009-6d29ba468f3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  }
];

// Componente de filtro de categorias
const CategoryFilter = ({ 
  selected, 
  onSelect 
}: { 
  selected: EventCategory, 
  onSelect: (category: EventCategory) => void 
}) => {
  const categories: { key: EventCategory, label: string }[] = [
    { key: 'todos', label: 'Todos' },
    { key: 'culto', label: 'Cultos' },
    { key: 'estudo', label: 'Estudos' },
    { key: 'reunião', label: 'Reuniões' },
    { key: 'confraternização', label: 'Confraternização' },
    { key: 'missões', label: 'Missões' }
  ];

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoryContainer}
    >
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat.key}
          style={[
            styles.categoryButton,
            selected === cat.key && styles.categoryButtonSelected
          ]}
          onPress={() => onSelect(cat.key)}
        >
          <Text 
            style={[
              styles.categoryText,
              selected === cat.key && styles.categoryTextSelected
            ]}
          >
            {cat.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

// Card para cada evento
const EventCard = ({ event }: { event: ChurchEvent }) => (
  <TouchableOpacity style={styles.eventCard} activeOpacity={0.8}>
    <Image source={{ uri: event.image }} style={styles.eventImage} />
    <View style={styles.eventContent}>
      <View style={styles.eventHeader}>
        <View style={styles.dateBox}>
          <Text style={styles.eventDay}>{event.date.split('/')[0]}</Text>
          <Text style={styles.eventMonth}>{
            ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'][
              parseInt(event.date.split('/')[1]) - 1
            ]
          }</Text>
        </View>
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <View style={styles.eventTimeLocation}>
            <FontAwesome name="clock-o" size={14} color="#94a3b8" style={{marginRight: 4}} />
            <Text style={styles.eventDetailText}>{event.time}</Text>
          </View>
          <View style={styles.eventTimeLocation}>
            <FontAwesome name="map-marker" size={14} color="#94a3b8" style={{marginRight: 4}} />
            <Text style={styles.eventDetailText}>{event.location}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.eventDescription} numberOfLines={2}>{event.description}</Text>
      <View style={styles.eventActions}>
        <TouchableOpacity style={styles.eventButton}>
          <Text style={styles.eventButtonText}>Participar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventIconButton}>
          <FontAwesome name="calendar-plus-o" size={18} color={Colors.dark.secondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.eventIconButton}>
          <FontAwesome name="share" size={18} color={Colors.dark.secondary} />
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

// Componente para evento em destaque
const FeaturedEvent = () => (
  <TouchableOpacity style={styles.featuredContainer} activeOpacity={0.9}>
    <Image 
      source={{ uri: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }}
      style={StyleSheet.absoluteFillObject}
    />
    <LinearGradient
      colors={['transparent', 'rgba(0,0,0,0.8)']}
      style={styles.featuredGradient}
    >
      <View style={styles.featuredBadge}>
        <Text style={styles.featuredBadgeText}>EM DESTAQUE</Text>
      </View>
      <Text style={styles.featuredTitle}>Conferência de Renovação</Text>
      <View style={styles.featuredDetails}>
        <View style={styles.featuredDetail}>
          <FontAwesome name="calendar" size={14} color="#fff" />
          <Text style={styles.featuredDetailText}>15-17 Julho</Text>
        </View>
        <View style={styles.featuredDetail}>
          <FontAwesome name="map-marker" size={14} color="#fff" />
          <Text style={styles.featuredDetailText}>Auditório Principal</Text>
        </View>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

export default function EventsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('todos');

  const filteredEvents = selectedCategory === 'todos' 
    ? churchEvents 
    : churchEvents.filter(event => event.category === selectedCategory);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Agenda</Text>
        <Text style={styles.headerSubtitle}>Fique por dentro de nossos eventos</Text>
      </View>

      <FeaturedEvent />
      
      <View style={styles.filterSection}>
        <CategoryFilter 
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </View>
      
      <View style={styles.eventsList}>
        {filteredEvents.map(event => (
          <EventCard key={event.id} event={event} />
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
    padding: 16,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 4,
  },
  filterSection: {
    paddingVertical: 16,
    backgroundColor: 'transparent',
  },
  categoryContainer: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: Colors.dark.card,
    borderWidth: 1,
    borderColor: Colors.dark.cardBorder,
  },
  categoryButtonSelected: {
    backgroundColor: Colors.dark.secondary,
    borderColor: Colors.dark.secondary,
  },
  categoryText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: '#fff',
  },
  eventsList: {
    padding: 16,
    backgroundColor: 'transparent',
  },
  eventCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.dark.cardBorder,
  },
  eventImage: {
    width: '100%',
    height: 150,
  },
  eventContent: {
    padding: 16,
    backgroundColor: 'transparent',
  },
  eventHeader: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  dateBox: {
    width: 60,
    height: 60,
    backgroundColor: Colors.dark.primary + '20',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: Colors.dark.primary + '40',
  },
  eventDay: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.dark.primary,
  },
  eventMonth: {
    fontSize: 14,
    color: Colors.dark.primary,
  },
  eventInfo: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 6,
  },
  eventTimeLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    backgroundColor: 'transparent',
  },
  eventDetailText: {
    fontSize: 14,
    color: '#94a3b8',
  },
  eventDescription: {
    fontSize: 15,
    color: '#94a3b8',
    lineHeight: 22,
    marginBottom: 16,
  },
  eventActions: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  eventButton: {
    backgroundColor: Colors.dark.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 'auto',
  },
  eventButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  eventIconButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  featuredContainer: {
    height: 200,
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  featuredGradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 16,
  },
  featuredBadge: {
    backgroundColor: Colors.dark.accent,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  featuredBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  featuredDetails: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  featuredDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: 'transparent',
  },
  featuredDetailText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});