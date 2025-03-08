import { StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Componente de Card para o menu principal
interface MenuCardProps {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  title: string;
  subtitle: string;
  route?: string;
  onPress?: () => void;
}

const MenuCard = ({ icon, title, subtitle, route, onPress }: MenuCardProps) => {
  const router = useRouter();
  
  const handlePress = () => {
    if (route) {
      // Fixed: Added type safety to router.push
      router.push(route as any);
    } else if (onPress) {
      onPress();
    }
  };
  
  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.7}>
      <FontAwesome name={icon} size={24} color={Colors.dark.secondary} style={styles.cardIcon} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Componente para o próximo evento em destaque
const UpcomingEvent = () => {
  const router = useRouter();
  
  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      style={styles.eventCard} 
      onPress={() => router.push('/two')}
    >
      <LinearGradient
        colors={[Colors.dark.primary + '40', Colors.dark.primary + '20']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.eventGradient}
      >
        <View style={styles.eventDateContainer}>
          <Text style={styles.eventDay}>22</Text>
          <Text style={styles.eventMonth}>JUN</Text>
        </View>
        <View style={styles.eventDetails}>
          <Text style={styles.eventTitle}>Culto de Celebração</Text>
          <Text style={styles.eventTime}>
            <FontAwesome name="clock-o" size={14} style={{marginRight: 4}} /> 19:00 - 21:00
          </Text>
          <Text style={styles.eventLocation}>
            <FontAwesome name="map-marker" size={14} style={{marginRight: 4}} /> Templo Principal
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

// Banner de anúncios para cultos ao vivo
const LiveBanner = () => (
  <TouchableOpacity activeOpacity={0.9} style={styles.liveBanner}>
    <LinearGradient
      colors={[Colors.dark.accent, Colors.dark.primary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.liveGradient}
    >
      <View style={styles.liveBadge}>
        <Text style={styles.liveText}>AO VIVO</Text>
      </View>
      <Text style={styles.liveTitle}>Culto de Domingo</Text>
      <View style={styles.liveButtonContainer}>
        <FontAwesome name="play-circle" size={18} color="#fff" style={{marginRight: 6}} />
        <Text style={styles.liveButtonText}>Assistir agora</Text>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const router = useRouter();
  
  return (
    <ScrollView style={styles.scrollView}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1551811331-9aed7c1f966c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80' }}
        style={styles.headerImage}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          <View style={styles.headerContent}>
            <Image
              source={{ uri: 'https://placekitten.com/100/100' }}
              style={styles.churchLogo}
            />
            <Text style={styles.title}>Igreja Batista Renovada</Text>
            <Text style={styles.subtitle}>Fé, Renovação e Esperança</Text>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.container}>
        <LiveBanner />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Próximos Eventos</Text>
          <TouchableOpacity onPress={() => router.push('/two')}>
            <Text style={styles.seeAllLink}>Ver todos</Text>
          </TouchableOpacity>
        </View>
        <UpcomingEvent />
        <UpcomingEvent />

        <Text style={[styles.sectionTitle, {marginTop: 24}]}>Acesso Rápido</Text>
        <View style={styles.menuGrid}>
          <MenuCard 
            icon="book" 
            title="Devocional" 
            subtitle="Palavra do dia"
            route="/devotional"
          />
          <MenuCard 
            icon="calendar" 
            title="Agenda" 
            subtitle="Próximos eventos"
            route="/two" 
          />
          <MenuCard 
            icon="music" 
            title="Louvores" 
            subtitle="Hinário digital"
          />
          <MenuCard 
            icon="heart" 
            title="Ofertas" 
            subtitle="Contribua online"
            route="/offerings"
          />
          <MenuCard 
            icon="users" 
            title="Ministérios" 
            subtitle="Nossas atividades"
            route="/community"
          />
          <MenuCard 
            icon="map-marker" 
            title="Localização" 
            subtitle="Como chegar"
            route="/location"
          />
        </View>

        <View style={styles.verseContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1499652848871-13a967d76a51?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80' }}
            style={StyleSheet.absoluteFillObject}
            blurRadius={1}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.8)']}
            style={StyleSheet.absoluteFillObject}
          />
          <Text style={styles.verse}>"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna."</Text>
          <Text style={styles.verseReference}>João 3:16</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.dark.background,
  },
  headerImage: {
    height: 240,
    width: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  headerContent: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  churchLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.dark.secondary,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.secondary,
    marginTop: 5,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  seeAllLink: {
    color: Colors.dark.secondary,
    fontSize: 14,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  card: {
    width: '30%', // Reduzido para 3 cards por linha em vez de 2
    backgroundColor: 'transparent',
    paddingVertical: 15,
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardIcon: {
    marginBottom: 8,
  },
  cardTextContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 11,
    color: '#aaa',
    marginTop: 2,
    textAlign: 'center',
  },
  eventCard: {
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  eventGradient: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
  },
  eventDateContainer: {
    backgroundColor: Colors.dark.secondary,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    minWidth: 60,
  },
  eventDay: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  eventMonth: {
    fontSize: 14,
    color: '#fff',
  },
  eventDetails: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  eventTime: {
    fontSize: 14,
    color: '#eee',
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventLocation: {
    fontSize: 14,
    color: Colors.dark.secondary,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveBanner: {
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  liveGradient: {
    padding: 20,
    borderRadius: 16,
  },
  liveBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  liveText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  liveTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  liveButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 50,
    alignSelf: 'flex-start',
  },
  liveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  verseContainer: {
    borderRadius: 16,
    padding: 24,
    marginVertical: 24,
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    minHeight: 200,
    justifyContent: 'center',
  },
  verse: {
    fontSize: 18,
    color: '#fff',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 26,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  verseReference: {
    fontSize: 16,
    color: Colors.dark.secondary,
    marginTop: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});