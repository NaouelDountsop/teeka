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
        name='notification'
        options={{
          headerShown:false,
        }}
        />

         <Stack.Screen
        name='settings'
        options={{
          headerShown:false,
        }}
        />
        <Stack.Screen
        name='langage'
        options={{
          headerShown:false,
        }}
        />

         <Stack.Screen
        name='profil'
        options={{
          headerShown:false,
        }}
        />
      </Stack>
      
  );
}
