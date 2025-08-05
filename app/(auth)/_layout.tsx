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
        name='slide'
        options={{
          headerShown:false,
        }}
        />
        <Stack.Screen
        name='login'
        options={{
          headerShown:false,
        }}
        />
        <Stack.Screen
        name='register'
        options={{
          headerShown:false,
        }}
        />
         <Stack.Screen
        name='forgot'
        options={{
          headerShown:false,
        }}
        />

        <Stack.Screen
        name='forgot2'
        options={{
          headerShown:false,
        }}
        />

          <Stack.Screen
        name='forgot3'
        options={{
          headerShown:false,
        }}
        />

        
          <Stack.Screen
        name='succes'
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

        <Stack.Screen
        name='welcome'
        options={{
          headerShown:false,
        }}
        />




      </Stack>
  );
}
