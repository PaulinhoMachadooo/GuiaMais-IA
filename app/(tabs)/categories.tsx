import { View, Text, StyleSheet, FlatList, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, X } from 'lucide-react-native';
import { useState, useMemo } from 'react';
import { categories } from '../../data';

export default function CategoriesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const clearSearch = () => {
    setSearchQuery('');
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;

    const query = searchQuery.toLowerCase().trim();
    
    // First, check if any category names match the query
    const categoryMatches = categories.filter(category => 
      category.name.toLowerCase().includes(query)
    );
    
    // Then, check for business name matches
    const businessMatches = categories.map(category => ({
      ...category,
      businesses: category.businesses.filter(business => 
        business.name.toLowerCase().includes(query) ||
        business.description?.toLowerCase().includes(query)
      )
    })).filter(category => category.businesses.length > 0);
    
    // Combine both results, ensuring no duplicates
    const combinedResults = [...categoryMatches];
    
    businessMatches.forEach(match => {
      // Check if this category is already in the results
      const existingIndex = combinedResults.findIndex(cat => cat.id === match.id);
      
      if (existingIndex >= 0) {
        // Merge the businesses arrays, avoiding duplicates
        const existingBusinessIds = new Set(combinedResults[existingIndex].businesses.map(b => b.id));
        const newBusinesses = match.businesses.filter(b => !existingBusinessIds.has(b.id));
        
        combinedResults[existingIndex].businesses = [
          ...combinedResults[existingIndex].businesses,
          ...newBusinesses
        ];
      } else {
        // Add the new category match
        combinedResults.push(match);
      }
    });
    
    return combinedResults;
  }, [searchQuery]);

  const renderCategory = ({ item }) => (
    <Pressable
      style={styles.categoryItem}
      onPress={() => router.push({
        pathname: '/businesses',
        params: { categoryId: item.id }
      })}>
      <Text style={styles.categoryName}>{item.name}</Text>
      <Text style={styles.categoryCount}>{item.businesses.length} estabelecimentos</Text>
    </Pressable>
  );

  return (
    <View style={{flex:1, width:"auto", alignItems:"center" }}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#64748b" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar estabelecimentos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#94a3b8"
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={clearSearch} style={styles.clearButton}>
              <X size={20} color="#64748b" />
            </Pressable>
          )}
        </View>

        <FlatList
          data={filteredCategories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhum resultado encontrado</Text>
              <Text style={styles.emptySubtext}>Tente buscar por outros termos</Text>
            </View>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width:"90%",
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 65,
    margin: 16,
    marginBottom: 8,
    marginTop: 50,
    paddingHorizontal: 16,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#0f172a',
  },
  clearButton: {
    padding: 8,
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  categoryItem: {
    backgroundColor: '#112342',
    padding: 10,
    alignItems:'center',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  categoryName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: '#64748b',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#64748b',
  },
});