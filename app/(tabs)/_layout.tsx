import { Tabs } from 'expo-router';
import { Building2, List, Store, Home } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0891b2',
        headerShown: true,
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