import { CartProvider } from '@/context/CartContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { Stack, Tabs } from 'expo-router';
import { UserProvider } from "@/context/UserContext";
import { AvatarProvider } from "@/context/AvatarContext";

export default function Layout() {
  return (
  
   <AvatarProvider>
  <UserProvider>
    <FavoritesProvider>
    <CartProvider>
      <Stack>
        <Stack.Screen
        name='(auth)'
        options={{
          headerShown:false,
          //href: null
        }}
        />
        <Stack.Screen
        name='(navigation)'
        options={{
          headerShown:false,
        }}
        />
        <Stack.Screen
        name='+not-found'
        options={{
          headerShown:false,
          href: null
        }}

        />
       
      </Stack>
    </CartProvider>
    </FavoritesProvider>
    </UserProvider>
    </AvatarProvider>
  );
}
