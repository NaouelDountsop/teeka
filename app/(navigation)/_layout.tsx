import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, useColorScheme, StyleSheet } from 'react-native';
import { useCart } from '@/context/CartContext';

export default function Layout() {
  const { cartItems } = useCart();
  const totalItems = cartItems.length;

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const backgroundColor = isDark ? '#1c1c1e' : '#fff';
  const borderColor = '#7F3DFF';
  const iconActiveColor = '#7F3DFF';
  const iconInactiveColor = isDark ? '#fff' : '#333';

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor,
          height: 100,
          paddingBottom: 5,
          borderTopColor: isDark ? '#333' : '#eee',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarActiveTintColor: iconActiveColor,
        tabBarInactiveTintColor: iconInactiveColor,
      }}
    >
      <Tabs.Screen
        name="(apps)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="Favoris"
        options={{
          title: 'Favorite',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="(paniers)"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <View>
              <MaterialCommunityIcons name="cart-outline" size={size} color={color} />
              {totalItems > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{totalItems}</Text>
                </View>
              )}
            </View>
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="(suivi)"
        options={{
          title: 'Command',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-document-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="(chat)"
        options={{
          title: 'Support',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -6,
    top: -4,
    backgroundColor: '#7F3DFF',
    borderRadius: 10,
    paddingHorizontal: 5,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
