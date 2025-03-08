import { Tabs, useRouter } from 'expo-router';
import { Building2, List, Store, Home } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { useCallback } from 'react';
import TabBar from "../../components/TabBar";

export default function TabLayout() {

  const router = useRouter();

  // Function to handle back navigation
  const handleGoBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    }
  }, [router]);
  
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'HOME',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'CATEGORIAS',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'SOBRE',
          headerShown: false,
        }}
      />
      
    </Tabs>
  );
}