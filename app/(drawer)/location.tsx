import React from 'react';
import { StyleSheet, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

export default function LocationScreen() {
  const openMap = () => {
    const address = "Igreja Batista Renovada";
    const url = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
    Linking.openURL(url).catch(err => console.error('Error opening map:', err));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Nossa Localização</Text>
        <Text style={styles.subtitle}>Venha nos visitar</Text>
        
        <Image 
          source={{ uri: 'https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap' }}
          style={styles.mapImage}
          resizeMode="cover"
        />
        
        <View style={styles.addressCard}>
          <FontAwesome name="map-marker" size={24} color={Colors.dark.secondary} style={styles.addressIcon} />
          <View style={styles.addressDetails}>
            <Text style={styles.addressTitle}>Endereço</Text>
            <Text style={styles.addressText}>Rua Exemplo, 123</Text>
            <Text style={styles.addressText}>Bairro Centro</Text>
            <Text style={styles.addressText}>Cidade - UF, 12345-678</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.directionButton} onPress={openMap}>
          <FontAwesome name="location-arrow" size={18} color="#000" style={{marginRight: 8}} />
          <Text style={styles.directionButtonText}>Como Chegar</Text>
        </TouchableOpacity>
        
        <View style={styles.hoursSection}>
          <Text style={styles.sectionTitle}>Horários de Funcionamento</Text>
          
          <View style={styles.serviceRow}>
            <View style={styles.serviceDay}>
              <Text style={styles.serviceDayText}>Domingo</Text>
            </View>
            <View style={styles.serviceDetails}>
              <Text style={styles.serviceTitle}>Culto de Celebração</Text>
              <Text style={styles.serviceTime}>10:00 - 12:00</Text>
              <Text style={styles.serviceTitle}>Culto da Noite</Text>
              <Text style={styles.serviceTime}>19:00 - 21:00</Text>
            </View>
          </View>
          
          <View style={styles.serviceRow}>
            <View style={styles.serviceDay}>
              <Text style={styles.serviceDayText}>Quarta</Text>
            </View>
            <View style={styles.serviceDetails}>
              <Text style={styles.serviceTitle}>Culto de Oração</Text>
              <Text style={styles.serviceTime}>19:30 - 21:00</Text>
            </View>
          </View>
          
          <View style={styles.serviceRow}>
            <View style={styles.serviceDay}>
              <Text style={styles.serviceDayText}>Sexta</Text>
            </View>
            <View style={styles.serviceDetails}>
              <Text style={styles.serviceTitle}>Reunião de Jovens</Text>
              <Text style={styles.serviceTime}>20:00 - 22:00</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.contactInfo}>
          <Text style={styles.contactTitle}>Contato</Text>
          <Text style={styles.contactText}>
            <FontAwesome name="phone" size={16} color="#888888" /> (00) 0000-0000
          </Text>
          <Text style={styles.contactText}>
            <FontAwesome name="envelope" size={16} color="#888888" /> contato@igrejabr.com
          </Text>
        </View>
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
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 20,
    backgroundColor: '#333',
  },
  addressCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.dark.cardBorder,
  },
  addressIcon: {
    marginRight: 16,
    marginTop: 4,
  },
  addressDetails: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 10,
  },
  addressText: {
    fontSize: 16,
    color: '#aaaaaa',
    marginBottom: 4,
  },
  directionButton: {
    backgroundColor: Colors.dark.secondary,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
  directionButtonText: {
    color: Colors.dark.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  hoursSection: {
    backgroundColor: 'transparent',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 16,
  },
  serviceRow: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  serviceDay: {
    width: 80,
    backgroundColor: 'transparent',
  },
  serviceDayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark.secondary,
  },
  serviceDetails: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  serviceTitle: {
    fontSize: 16,
    color: Colors.dark.text,
    fontWeight: '500',
  },
  serviceTime: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 8,
  },
  contactInfo: {
    backgroundColor: 'transparent',
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 12,
  },
  contactText: {
    fontSize: 16,
    color: '#aaaaaa',
    marginBottom: 8,
  },
});
