import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { categories } from '../../data';

export default function BusinessesScreen() {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams();
  
  const category = categories.find(cat => cat.id === categoryId);
  
  if (!category) {
    return (
      <View style={styles.container}>
        <Text>Categoria não encontrada</Text>
      </View>
    );
  }

  const renderBusiness = ({ item }) => (
    <Pressable
      style={styles.businessItem}
      onPress={() => router.push({
        pathname: '/details',
        params: { id: item.id, categoryId: categoryId }
      })}>
      {/*<Image source={{ uri: item.images[0] }} style={styles.businessImage} />*/}
      <View style={styles.businessInfo}>
        <Text style={styles.businessName}>{item.name}</Text>
      {/*<Text style={styles.businessCategory}>{category.name}</Text>*/}
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable 
          onPress={() => router.push('/categories')} 
          style={styles.backButton}>
          <ArrowLeft size={24} color="#0f172a" />
        </Pressable>
        <Text style={styles.categoryTitle}>{category.name}</Text>
      </View>
      <FlatList
        data={category.businesses}
        renderItem={renderBusiness}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backButton: {
    marginRight: 12,
    padding: 4,
    marginTop: 30,
  },
  categoryTitle: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: '600',
    color: '#0f172a',
  },
  listContainer: {
    padding: 16,
  },
  businessItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  businessImage: {
    width: '100%',
    height: 200,
  },
  businessInfo: {
    padding: 16,
  },
  businessName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  businessCategory: {
    fontSize: 14,
    color: '#0891b2',
    marginBottom: 4,
  },
  businessAddress: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  ratingContainer: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  ratingText: {
    color: '#d97706',
    fontWeight: '600',
  },
});