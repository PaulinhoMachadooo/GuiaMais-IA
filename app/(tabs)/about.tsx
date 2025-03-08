import { View, Text, StyleSheet, Image, ScrollView, Linking } from 'react-native';
import { Mail, Phone, MapPin, Globe } from 'lucide-react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800' }}
          style={styles.headerImage}
        />
        <View style={styles.overlay}>
          <Text style={styles.title}>CityGuide</Text>
          <Text style={styles.subtitle}>Seu guia local de confiança</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Sobre Nós</Text>
        <Text style={styles.description}>
          O GUIA + é seu companheiro definitivo para descobrir o melhor que sua cidade tem a oferecer. 
          Nossa missão é conectar pessoas a experiências incríveis, facilitando a descoberta de estabelecimentos 
          locais de qualidade.
        </Text>

        {/*<View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1000+</Text>
            <Text style={styles.statLabel}>Estabelecimentos</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>50k+</Text>
            <Text style={styles.statLabel}>Usuários</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Avaliação</Text>
          </View>
        </View>*/}

        <Text style={styles.sectionTitle}>Contato</Text>
        <View style={styles.contactContainer}>
          <View style={styles.contactItem}>
            <Phone size={20} color="#ff5e00" />
            <Text 
              style={styles.contactText}
              onPress={() => Linking.openURL('tel:+551199999999')}>
              (11) 9999-9999
            </Text>
          </View>
          <View style={styles.contactItem}>
            <Mail size={20} color="#ff5e00" />
            <Text 
              style={styles.contactText}
              onPress={() => Linking.openURL('mailto:contato@cityguide.com')}>
              contato@cityguide.com
            </Text>
          </View>
          <View style={styles.contactItem}>
            <MapPin size={20} color="#ff5e00" />
            <Text style={styles.contactText}>
              Av. Paulista, 1000 - São Paulo, SP
            </Text>
          </View>
          <View style={styles.contactItem}>
            <Globe size={20} color="#ff5e00" />
            <Text 
              style={styles.contactText}
              onPress={() => Linking.openURL('https://cityguide.com')}>
              www.cityguide.com
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 200,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ff5e00',
    marginBottom: 16,
    marginTop: 24,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff8f5',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff5e00',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  contactContainer: {
    backgroundColor: '#fff8f5',
    padding: 20,
    borderRadius: 12,
    gap: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
});