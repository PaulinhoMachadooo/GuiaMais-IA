import { Tabs, useRouter } from 'expo-router';
import { Building2, List, Store, Home } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { useCallback } from 'react';

export default function TabLayout() {

  const router = useRouter();

  // Function to handle back navigation
  const handleGoBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    }
  }, [router]);
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#112342',
        headerShown: true,
        headerLeft: () => (
          <Pressable
            onPress={handleGoBack}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              padding: 10,
              marginLeft: 5,
            })}
          >
            {({ pressed }) => (
              <List 
                size={24} 
                color="#0891b2" 
                style={{ transform: [{ rotate: '90deg' }] }} 
              />
            )}
          </Pressable>
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categorias',
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <List size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="businesses"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Store size={size} color={color} />
          ),
          href: null,
        }}
      />
      <Tabs.Screen
        name="details"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Building2 size={size} color={color} />
          ),
          href: null,
        }}
      />
    </Tabs>
  );
}