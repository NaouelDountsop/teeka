import { Slot, Stack, Tabs } from 'expo-router';
import { CartProvider } from '@/context/CartContext';
 
export default function Layout() {

  
  return (
      <Stack>
        <Stack.Screen
        name='index'
        options={{
          headerShown:false,
        }}
        />
        <Stack.Screen
        name='paiement1'
        options={{
          headerShown:false,
        }}
        />
      </Stack>
  );
}
