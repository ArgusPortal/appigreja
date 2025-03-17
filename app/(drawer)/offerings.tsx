import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

export default function OfferingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Ofertas e Dízimos</Text>
        <Text style={styles.subtitle}>Contribua para a obra de Deus</Text>
        
        <Text style={styles.verseText}>
          "Cada um dê conforme determinou em seu coração, não com pesar ou por obrigação, pois Deus ama quem dá com alegria." - 2 Coríntios 9:7
        </Text>
        
        <View style={styles.methodCard}>
          <FontAwesome name="bank" size={24} color={Colors.dark.secondary} style={styles.methodIcon} />
          <View style={styles.methodDetails}>
            <Text style={styles.methodTitle}>Transferência Bancária</Text>
            <Text style={styles.methodInfo}>Banco Itaú</Text>
            <Text style={styles.methodInfo}>Agência: 1628</Text>
            <Text style={styles.methodInfo}>Conta: 75655-1</Text>
            <Text style={styles.methodInfo}>Igreja Batista da Cidade</Text>
            <Text style={styles.methodInfo}>CNPJ: 35.840.425/0001-93</Text>
          </View>
        </View>
        
        <View style={styles.methodCard}>
          <FontAwesome name="qrcode" size={24} color={Colors.dark.secondary} style={styles.methodIcon} />
          <View style={styles.methodDetails}>
            <Text style={styles.methodTitle}>PIX</Text>
            <Text style={styles.methodInfo}>Chave CNPJ: 35.840.425/0001-93</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Copiar Chave PIX</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity style={styles.donateButton}>
          <Text style={styles.donateButtonText}>Contribuir Online</Text>
          <FontAwesome name="arrow-right" size={18} color="#000" style={{marginLeft: 8}} />
        </TouchableOpacity>
        
        <Text style={styles.contactText}>
          Para mais informações sobre contribuições, entre em contato com a tesouraria da igreja pelo e-mail contato@igrejapracidade.com.br
        </Text>
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
  verseText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#aaaaaa',
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  methodCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.dark.cardBorder,
  },
  methodIcon: {
    marginRight: 16,
    marginTop: 4,
  },
  methodDetails: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  methodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 8,
  },
  methodInfo: {
    fontSize: 14,
    color: '#aaaaaa',
    marginBottom: 4,
  },
  button: {
    backgroundColor: Colors.dark.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: Colors.dark.text,
    fontSize: 14,
    fontWeight: '600',
  },
  donateButton: {
    backgroundColor: Colors.dark.secondary,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  donateButtonText: {
    color: Colors.dark.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactText: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 20,
  },
});
