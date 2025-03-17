import { StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Image, Dimensions, Platform, Linking } from 'react-native';
import { Text, View } from '@/components/Themed';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useSafeNavigation } from '@/utils/navigationUtils';
import React, { useCallback } from 'react';
import { useAndroidBackHandler } from '@/utils/androidBackHandler';

const { width } = Dimensions.get('window');

// Componente de Card para o menu principal
interface MenuCardProps {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  title: string;
  subtitle: string;
  route?: string;
  onPress?: () => void;
}

// Card component with enhanced fluid gradient
const MenuCard = ({ icon, title, subtitle, route, onPress }: MenuCardProps) => {
  const { navigate } = useSafeNavigation();
  
  const handlePress = useCallback(() => {
    if (route) {
      navigate(route);
    } else if (onPress) {
      onPress();
    }
  }, [route, onPress, navigate]);
  
  return (
    <TouchableOpacity 
      style={styles.cardWrapper} 
      onPress={handlePress} 
      activeOpacity={0.7}
      accessibilityLabel={title}
      accessibilityHint={subtitle}
    >
      <LinearGradient
        colors={[
          Colors.dark.primary + '30',
          Colors.dark.primary + '40', 
          Colors.dark.primary + '20'
        ]}
        locations={[0, 0.5, 1]}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
        style={styles.card}
      >
        <View style={styles.iconContainer}>
          <FontAwesome name={icon} size={28} color={Colors.dark.secondary} />
        </View>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

// Componente para o próximo evento em destaque com gradiente melhorado
const UpcomingEvent = ({ 
  imageUrl = 'https://images.unsplash.com/photo-1507036066871-b7e8032b3dea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  day = "22",
  month = "JUN",
  title = "Culto de Celebração",
  time = "19:00 - 21:00",
  location = "Templo Principal"
}) => {
  const { navigate } = useSafeNavigation();
  
  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      style={styles.eventCard} 
      onPress={() => navigate('/two')}
    >
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.eventBackground}
        imageStyle={{ borderRadius: 16 }}
      >
        <LinearGradient
          colors={[
            'rgba(0,0,0,0.8)',
            'rgba(0,0,0,0.7)',
            'rgba(0,0,0,0.6)'
          ]}
          locations={[0, 0.6, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.eventGradient}
        >
          <View style={[styles.eventDateContainer, {backgroundColor: 'rgba(0, 0, 0, 0.7)'}]}>
            <Text style={styles.eventDay}>{day}</Text>
            <Text style={styles.eventMonth}>{month}</Text>
          </View>
          <View style={styles.eventDetails}>
            <Text style={styles.eventTitle}>{title}</Text>
            <View style={styles.eventTimeWrapper}>
              <FontAwesome name="clock-o" size={14} color="#eee" style={{marginRight: 4}} />
              <Text style={styles.eventTime}>{time}</Text>
            </View>
            <View style={styles.eventLocationWrapper}>
              <FontAwesome name="map-marker" size={14} color={Colors.dark.secondary} style={{marginRight: 4}} />
              <Text style={styles.eventLocation}>{location}</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

// Banner de anúncios para cultos ao vivo com gradiente mais suave e fluido
const LiveBanner = () => {
  const openYouTubeChannel = async () => {
    const youtubeUrl = 'https://www.youtube.com/igrejapracidade';
    try {
      const supported = await Linking.canOpenURL(youtubeUrl);
      if (supported) {
        await Linking.openURL(youtubeUrl);
      } else {
        console.log("Não foi possível abrir o URL: " + youtubeUrl);
      }
    } catch (error) {
      console.error("Erro ao abrir o URL:", error);
    }
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      style={styles.liveBanner}
      onPress={openYouTubeChannel}
    >
      <LinearGradient
        colors={[
          Colors.dark.accent + 'CC', 
          Colors.dark.accent + 'AA',
          Colors.dark.primary + 'BB', 
          Colors.dark.primary + 'DD'
        ]}
        locations={[0, 0.3, 0.7, 1]}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
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
};

// Enhance the header gradient
export default function HomeScreen() {
  const { navigate } = useSafeNavigation();
  
  // Aplicar o handler para mostrar diálogo de confirmação ao sair do app
  useAndroidBackHandler(undefined, true);
  
  return (
    <ScrollView style={styles.scrollView}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1551811331-9aed7c1f966c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80' }}
        style={styles.headerImage}
      >
        <LinearGradient
          colors={[
            'transparent',
            Colors.dark.background + '80',
            Colors.dark.background
          ]}
          locations={[0, 0.7, 1]}
          style={styles.gradient}
        >
          <View style={styles.headerContent}>
            {/* Fix for logo - Using require instead of uri string */}
            <Image
              source={require('@/assets/images/church-logo.png')}
              style={styles.churchLogo}
              defaultSource={require('@/assets/images/adaptive-icon.png')} // Fallback
            />
            <Text style={styles.title}>Igreja Batista da Cidade</Text>
            <Text style={styles.subtitle}>Fé, Renovação e Esperança</Text>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.container}>
        <LiveBanner />

        <View style={[styles.sectionHeader, {marginTop: 16}]}> {/* Removendo margem excessiva que causa linha branca */}
          <Text style={styles.sectionTitle}>Próximos Eventos</Text>
          <TouchableOpacity onPress={() => navigate('/two')}>
            <Text style={styles.seeAllLink}>Ver todos</Text>
          </TouchableOpacity>
        </View>
        <UpcomingEvent 
          imageUrl="https://images.unsplash.com/photo-1507036066871-b7e8032b3dea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
          day="22"
          month="JUN"
          title="Culto de Celebração"
          time="19:00 - 21:00"
          location="Templo Principal"
        />
        <UpcomingEvent 
          imageUrl="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
          day="25"
          month="JUN"
          title="Estudo Bíblico"
          time="20:00 - 21:30"
          location="Auditório Central"
        />

        <Text style={[styles.sectionTitle, {marginTop: 16, marginBottom: 16}]}>Acesso Rápido</Text>
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
            colors={[
              'rgba(0,0,0,0.75)',
              'rgba(0,0,0,0.70)',
              'rgba(0,0,0,0.80)'
            ]}
            locations={[0, 0.5, 1]}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 0.9, y: 0.9 }}
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
    backgroundColor: '#1a1a1a', // Fallback background color
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
    marginTop: 16, // Reduced from 24
    marginBottom: 12,
    backgroundColor: 'transparent', // Added to ensure transparency
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
    paddingHorizontal: 5,
    backgroundColor: 'transparent',
  },
  cardWrapper: {
    width: '30%',
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  card: {
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    height: 100,
    justifyContent: 'center',
    elevation: 3,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    backgroundColor: 'transparent',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginVertical: 6, // Reduced to tighten spacing
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'transparent', // Keep transparent since we're using ImageBackground
    height: 110, // Fixed height for consistency
  },
  eventBackground: {
    width: '100%',
    height: '100%',
  },
  eventGradient: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    height: '100%',
    backgroundColor: 'transparent', // Ensure no white background
  },
  eventDateContainer: {
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    minWidth: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark semi-transparent background
    borderWidth: 1,
    borderColor: Colors.dark.secondary,
  },
  eventDay: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // Explicit white color
  },
  eventMonth: {
    fontSize: 14,
    color: '#FFFFFF', // Explicit white color
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
  eventTimeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    backgroundColor: 'transparent',
  },
  eventTime: {
    fontSize: 14,
    color: '#eee',
  },
  eventLocationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    backgroundColor: 'transparent',
  },
  eventLocation: {
    fontSize: 14,
    color: Colors.dark.secondary,
  },
  liveBanner: {
    marginTop: 10, // Reduced from 16
    marginBottom: 4, // Added to adjust spacing
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