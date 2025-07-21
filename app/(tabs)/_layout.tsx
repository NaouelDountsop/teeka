import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#33218F',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'page3') {
            iconName = 'home';
          } else if (route.name === 'addmenu') {
            iconName = 'add-circle';
          } else if (route.name === 'CommandeScreen') {
            iconName = 'time';
          } else if (route.name === 'CartScreen') {
            iconName = 'cart';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="page3" options={{ title: 'Accueil' }} />
      <Tabs.Screen name="addmenu" options={{ title: 'Ajouter' }} />
      <Tabs.Screen name="CommandeScreen" options={{ title: 'Historique' }} />
      <Tabs.Screen name="CartScreen" options={{ title: 'Panier' }} />
    </Tabs>
  );
}
